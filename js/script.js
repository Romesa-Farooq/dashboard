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
    },

    recentOrders: [

        {
            customer: "Sarah Khan",
            product: "Wireless Mouse",
            amount: 120,
            status: "Completed",
            date: "Sep 13, 2026"
        },

        {
            customer: "Ahmed Ali",
            product: "Mechanical Keyboard",
            amount: 85,
            status: "Pending",
            date: "Sep 12, 2026"
        },

        {
            customer: "Hina Malik",
            product: "USB-C Hub",
            amount: 64,
            status: "Completed",
            date: "Sep 11, 2026"
        },

        {
            customer: "Usman Raza",
            product: "Laptop Stand",
            amount: 48,
            status: "Processing",
            date: "Sep 10, 2026"
        },

        {
            customer: "Ayesha Noor",
            product: "Wireless Headphones",
            amount: 145,
            status: "Completed",
            date: "Sep 9, 2026"
        },

        {
            customer: "Bilal Ahmed",
            product: "Gaming Mouse",
            amount: 72,
            status: "Pending",
            date: "Sep 8, 2026"
        },

        {
            customer: "Maham Tariq",
            product: "Laptop Backpack",
            amount: 95,
            status: "Completed",
            date: "Sep 7, 2026"
        },

        {
            customer: "Hamza Shah",
            product: "USB-C Cable",
            amount: 32,
            status: "Processing",
            date: "Sep 6, 2026"
        }

    ]

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

                    borderColor: "#2563eb",

                    backgroundColor: "rgba(37, 99, 235, 0.08)",

                    borderWidth: 2,

                    tension: 0.3,

                    fill: true,

                    pointRadius: 3,

                    pointHoverRadius: 5
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

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#7a828a"
                    }

                },

                y: {

                    beginAtZero: true,

                    grid: {
                        color: "#eeeeee"
                    },

                    ticks: {
                        color: "#7a828a"
                    }

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

                    data: dashboardData.categorySales.values,

                    backgroundColor: "#2563eb",

                    borderRadius: 6,

                    barThickness: 28
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

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#7a828a"
                    }

                },

                y: {

                    beginAtZero: true,

                    grid: {
                        color: "#eeeeee"
                    },

                    ticks: {
                        color: "#7a828a"
                    }

                }

            }

        }

    });


    let showingAllOrders = false;


    function renderOrders() {

        const ordersTableBody = $("#ordersTableBody");

        ordersTableBody.empty();


        const ordersToDisplay = showingAllOrders
            ? dashboardData.recentOrders
            : dashboardData.recentOrders.slice(0, 4);


        ordersToDisplay.forEach(function (order) {

            const row = `
                <tr>
                    <td>${order.customer}</td>

                    <td>${order.product}</td>

                    <td>$${order.amount.toLocaleString()}</td>

                    <td>
                        <span class="status-badge ${order.status.toLowerCase()}">
                            ${order.status}
                        </span>
                    </td>

                    <td>${order.date}</td>
                </tr>
            `;

            ordersTableBody.append(row);

        });


        $("#viewAllOrders").text(
            showingAllOrders ? "Show Less" : "View All"
        );

    }


    renderOrders();


    $("#viewAllOrders").click(function () {

        showingAllOrders = !showingAllOrders;

        renderOrders();

    });

});