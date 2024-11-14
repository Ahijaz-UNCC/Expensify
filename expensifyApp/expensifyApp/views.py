from django.shortcuts import render, redirect
from .forms import SignUpForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .forms import ExpenseForm
from .models import Expense, Profile
from django.contrib.auth.decorators import login_required


def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = SignUpForm()
    return render(request, "signup.html", {"form" : form})

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password")
    return render(request, 'login.html')


@login_required
def dashboard(request):
    # Ensure the user has a profile
    profile, created = Profile.objects.get_or_create(user=request.user)
    
    form = ExpenseForm()
    if request.method == 'POST':
        form = ExpenseForm(request.POST)
        if form.is_valid():
            expense = form.save(commit=False)
            expense.user = request.user  # Associate expense with the user if necessary
            expense.save()
            # Update the profile's total expense
            profile.total_expense += expense.amount
            profile.wallet_balance -= expense.amount
            profile.save()
            return redirect('dashboard')

    # Retrieve all expenses associated with the user
    expenses = Expense.objects.filter(user=request.user).order_by('-date')
    return render(request, 'dashboard.html', {
        'form': form,
        'expenses': expenses,
        'wallet_balance': profile.wallet_balance,
        'total_expense': profile.total_expense,
    })