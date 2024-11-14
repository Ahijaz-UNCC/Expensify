function showSection(sectionId) {
    document.querySelectorAll('.section').forEach((section) => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function enlargeSection(sectionId) {
    const sectionContent = document.getElementById(sectionId).innerHTML;
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `<span class="close" onclick="closeModal()">&times;</span>${sectionContent}`;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
// Wallet Pie Chart
const walletCtx = document.getElementById('walletPieChart').getContext('2d');
const walletPieChart = new Chart(walletCtx, {
    type: 'pie',
    data: {
        labels: ['Available Balance', 'Spent'],
        datasets: [{
            data: [70, 30], // Sample data; adjust as needed
            backgroundColor: ['#00FF9A', '#FF3A3A'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        }
    }
});

// Expense Line Chart
const expenseCtx = document.getElementById('expenseLineChart').getContext('2d');
const expenseLineChart = new Chart(expenseCtx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Total Expenses',
            data: [1000, 1500, 2000, 2500, 3000, 3500, 4000], // Sample data; adjust as needed
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4 // Curves the line for a smooth appearance
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Budget Summary Pie Chart
const budgetCtx = document.getElementById('budgetPieChart').getContext('2d');
const budgetPieChart = new Chart(budgetCtx, {
    type: 'pie',
    data: {
        labels: ['Savings', 'Expenses', 'Loan'],
        datasets: [{
            data: [40, 35, 25], // Sample data; adjust as needed
            backgroundColor: ['#00FF9A', '#FF3A3A', '#FFD60A'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        }
    }
});
