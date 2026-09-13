const dashboardData = {
    statistics: {
        sales: 24580,
        orders: 356,
        customers: 1248
    },

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

    $("#totalSales").text("$" + dashboardData.statistics.sales.toLocaleString());

    $("#totalOrders").text(dashboardData.statistics.orders.toLocaleString());

    $("#customers").text(dashboardData.statistics.customers.toLocaleString());


    const pendingCount = dashboardData.recentOrders.filter(
        order => order.status === "Pending"
    ).length;

    $("#pendingOrders").text(pendingCount);


    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    $("#currentDate").text(formattedDate);


    const hour = today.getHours();

    let greeting = "Good evening";

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    $("#welcomeMessage").text(greeting + ", Romesa");


    new Chart(document.getElementById("salesChart"), {
        type: "line",
        data: {
            labels: dashboardData.monthlySales.labels,
            datasets: [{
                label: "Sales",
                data: dashboardData.monthlySales.values,
                borderWidth: 2,
                tension: 0.4,
                fill: false
            }]
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
                    ticks: {
                        callback: function (value) {
                            return "$" + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });


    new Chart(document.getElementById("categoryChart"), {
        type: "bar",
        data: {
            labels: dashboardData.categorySales.labels,
            datasets: [{
                label: "Sales",
                data: dashboardData.categorySales.values,
                borderWidth: 1
            }]
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
                    ticks: {
                        callback: function (value) {
                            return "$" + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });


    let showingAllOrders = false;
    let selectedStatus = "All";
    let searchText = "";


    function renderOrders() {

        const filteredOrders = dashboardData.recentOrders.filter(function (order) {

            const matchesStatus =
                selectedStatus === "All" ||
                order.status === selectedStatus;

            const matchesSearch =
                order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
                order.product.toLowerCase().includes(searchText.toLowerCase());

            return matchesStatus && matchesSearch;
        });


        const ordersToShow = showingAllOrders
            ? filteredOrders
            : filteredOrders.slice(0, 4);


        $("#ordersTableBody").empty();


        if (ordersToShow.length === 0) {

            $("#ordersTableBody").html(`
                <tr>
                    <td colspan="5" class="no-results">
                        No results found
                    </td>
                </tr>
            `);

        } else {

            ordersToShow.forEach(function (order) {

                const statusClass = order.status.toLowerCase();

                $("#ordersTableBody").append(`
                    <tr>
                        <td>${order.customer}</td>
                        <td>${order.product}</td>
                        <td>$${order.amount}</td>
                        <td>
                            <span class="status-badge ${statusClass}">
                                ${order.status}
                            </span>
                        </td>
                        <td>${order.date}</td>
                    </tr>
                `);
            });
        }


        if (filteredOrders.length > 4) {
            $("#viewAllOrders").show();

            if (showingAllOrders) {
                $("#viewAllOrders").text("Show Less");
            } else {
                $("#viewAllOrders").text("View All");
            }

        } else {
            $("#viewAllOrders").hide();
        }
    }


    renderOrders();


    $("#viewAllOrders").on("click", function () {

        showingAllOrders = !showingAllOrders;

        renderOrders();
    });


    $(".filter-button").on("click", function () {

        $(".filter-button").removeClass("active");

        $(this).addClass("active");

        selectedStatus = $(this).data("status");

        showingAllOrders = false;

        renderOrders();
    });


    $("#orderSearch").on("input", function () {

        searchText = $(this).val();

        showingAllOrders = false;

        renderOrders();
    });


    $(".sidebar-nav .nav-link").on("click", function (e) {

        e.preventDefault();

        $(".sidebar-nav .nav-link").removeClass("active");

        $(this).addClass("active");
    });


    $("#profileButton").on("click", function (e) {

        e.stopPropagation();

        $("#profileMenu").toggle();

        $("#notificationMenu").hide();

        $("#quickMenu").hide();
    });


    $("#notificationButton").on("click", function (e) {

        e.stopPropagation();

        $("#notificationMenu").toggle();

        $("#profileMenu").hide();

        $("#quickMenu").hide();
    });


    $("#quickButton").on("click", function (e) {

        e.stopPropagation();

        $("#quickMenu").toggle();

        $("#profileMenu").hide();

        $("#notificationMenu").hide();
    });


    $("#quickOrders").on("click", function () {

        $("#quickMenu").hide();

        $("html, body").animate({
            scrollTop: $(".orders-card").offset().top
        }, 500);
    });


    $("#quickNotifications").on("click", function () {

        $("#quickMenu").hide();

        $("#notificationMenu").toggle();
    });


    $("#quickSettings").on("click", function () {

        $("#quickMenu").hide();

        alert("Settings clicked");
    });


    $(document).on("click", function () {

        $("#profileMenu").hide();

        $("#notificationMenu").hide();

        $("#quickMenu").hide();
    });

});