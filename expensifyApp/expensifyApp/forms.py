from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Expense

class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['description', 'amount', 'category']
        widgets = {
            'description': forms.TextInput(attrs={'placeholder': 'Description'}),
            'amount': forms.NumberInput(attrs={'placeholder': 'Amount'}),
            'category': forms.Select()
        }
