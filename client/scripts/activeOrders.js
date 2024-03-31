const fetchOrdersBtn = document.getElementById('fetch-orders-btn');
const ordersContainer = document.getElementById('orders-container');

function displayOrders(ordersData) {
    ordersContainer.innerHTML = ''; // Clear previous orders

    ordersData.forEach((order, index) => {
        const orderHtml = `
                <div class="col-md-4 mb-4">
                    <main class="orderMain">
                        <section class="orderSection">
                            <div class="order-details p-4 rounded-lg overflow-hidden bg-white !border-none shadow-md">
                                <h1 class="order-id text-xl leading-none font-semibold">Order ID: ${order.uniqueOrderId}</h1>
                                <div class="order-info flex flex-col gap-y-1.5 my-3">
                                    <div class="order-info-item border rounded px-2 py-1">
                                        <p class="font-semibold">Short Description</p> ${order.shortDescription}
                                    </div>
                                    <div class="order-info-item border rounded px-2 py-1">
                                        <p class="font-semibold">Payment Status</p> ${order.paymentStatus}
                                    </div>
                                    <div class="order-info-item border rounded px-2 py-1">
                                        <p class="font-semibold">Payment Mode</p> ${order.paymentMode}
                                    </div>
                                    <div class="order-info-item border rounded px-2 py-1">
                                        <p class="font-semibold">UniqueIdVerified</p>
                                        <span class="${order.isOrderIDVerified ? 'green' : 'red'}">${order.isOrderIDVerified}</span>
                                    </div>
                                </div>
                                <button class="border bg-[rgb(4,91,230)] text-center w-full rounded py-1 text-white">Verify</button>
                            </div>
                        </section>
                    </main>
                </div>
            `;
        ordersContainer.insertAdjacentHTML('beforeend', orderHtml);
    });
}

window.addEventListener('load', async () => {
    try {
        const response = await fetch('http://localhost:8000/orders');
        const ordersData = await response.json();

        if (response.ok) {
            displayOrders(ordersData);
            console.log("orders are: " + JSON.stringify(ordersData));
        } else {
            console.error('Failed to fetch orders:', ordersData.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
})