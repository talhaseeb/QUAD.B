document.addEventListener('DOMContentLoaded', function() {
    const fetchOrdersBtn = document.getElementById('fetch-orders-btn');
    const ordersContainer = document.getElementById('orders-container');

    fetchOrdersBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/orders');
            const ordersData = await response.json();

            if (response.ok) {
                displayOrders(ordersData);
                console.log("orders are: "+JSON.stringify(ordersData));
            } else {
                console.error('Failed to fetch orders:', ordersData.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    });

    function displayOrders(ordersData) {
        ordersContainer.innerHTML = ''; // Clear previous orders

        ordersData.forEach((order, index) => {
            const orderHtml = `
                <div class="col-md-4 mb-4">
                    <main class="orderMain">
                        <section class="orderSection">
                            <div class="order-details">
                                <h1 class="order-id">Order ID: ${order.uniqueOrderId}</h1>
                                <div class="order-info">
                                    <div class="order-info-item">
                                        <strong>Short Description:</strong> ${order.shortDescription}
                                    </div>
                                    <div class="order-info-item">
                                        <strong>Payment Status:</strong> ${order.paymentStatus}
                                    </div>
                                    <div class="order-info-item">
                                        <strong>Payment Mode:</strong> ${order.paymentMode}
                                    </div>
                                    <div class="order-info-item">
                                        <strong>UniqueIdVerified:</strong>
                                        <span class="${order.isUniqueIdVerified ? 'green' : 'red'}">${order.uniqueIdVerified}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            `;
            ordersContainer.insertAdjacentHTML('beforeend', orderHtml);
        });
    }
});