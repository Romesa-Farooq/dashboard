const dashboardData = {
    sales: 24580,
    orders: 356,
    customers: 1248,
    pendingOrders: 18,

    monthlySales: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [12000, 15000, 13500, 18000, 21000, 24580]
    },

    categorySales: {
        labels: ["Electronics", "Clothing", "Home", "Sports"],
        values: [8200, 6400, 5100, 3900]
    }
};

$(document).ready(function () {

    $("#totalSales").text(
        "$" + dashboardData.sales.toLocaleString()
    );

    $("#totalOrders").text(
        dashboardData.orders.toLocaleString()
    );

    $("#customers").text(
        dashboardData.customers.toLocaleString()
    );

    $("#pendingOrders").text(
        dashboardData.pendingOrders.toLocaleString()
    );


    const salesCanvas = document.getElementById("salesChart");

    new Chart(salesCanvas, {
        type: "line",

        data: {
            labels: dashboardData.monthlySales.labels,

            datasets: [
                {
                    label: "Sales",
                    data: dashboardData.monthlySales.values,
                    tension: 0.3,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    const categoryCanvas = document.getElementById("categoryChart");

    new Chart(categoryCanvas, {
        type: "bar",

        data: {
            labels: dashboardData.categorySales.labels,

            datasets: [
                {
                    label: "Sales",
                    data: dashboardData.categorySales.values
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

});