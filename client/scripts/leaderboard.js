console.clear();

// Function to fetch partners data from the API
async function fetchPartnersData() {
    try {
        const response = await fetch('http://localhost:8000/partners');
        if (!response.ok) {
            throw new Error('Failed to fetch partners data');
        }
        const partners = await response.json(); console.log(partners);
        return partners;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to calculate leaderboard ranking for each partner
function calculateLeaderboard(partners) {
    const w1 = 0.3; // Weight for item count
    const w2 = 0.4; // Weight for order count
    const w3 = 0.4; // Weight for vote count
    const maxVotes = Math.max(...partners.map(partner => 1));
    const maxItems = Math.max(...partners.map(partner => partner.netItemsCount));
    const maxOrders = Math.max(...partners.map(partner => partner.ordersPlaced));

    partners.forEach(partner => {
        const maxItemsDenominator = maxItems !== 0 ? maxItems : 1; // Avoid division by zero
        const maxOrdersDenominator = maxOrders !== 0 ? maxOrders : 1; // Avoid division by zero
        const maxVotesDenominator = maxVotes !== 0 ? maxVotes : 1; // Avoid division by zero
    
        const normalizedItemCount = isNaN(partner.netItemsCount) ? 0 : (partner.netItemsCount - 0) / maxItemsDenominator;
        const normalizedOrderCount = isNaN(partner.ordersPlaced) ? 0 : (partner.ordersPlaced - 0) / maxOrdersDenominator;
        const normalizedVoteCount = (1 - 0) / maxVotesDenominator; // Denominator for votes count is always 1
    
        partner.leaderboardRanking = 100 * ((w1 * normalizedItemCount) + (w2 * normalizedOrderCount) + (w3 * normalizedVoteCount));
    });    

    // Sort partners based on leaderboard ranking
    partners.sort((a, b) => b.leaderboardRanking - a.leaderboardRanking);
    return partners;
}

const randomEmoji = () => {
	const emojis = ['👏','👍','🙌','🤩','🔥','⭐️','🏆','💯'];
	let randomNumber = Math.floor(Math.random() * emojis.length);
	return emojis[randomNumber]
}

// Render leaderboard with updated data
async function renderLeaderboard() {
    const partners = await fetchPartnersData();
    const rankedPartners = calculateLeaderboard(partners);

    const list = document.getElementById('list');
    list.innerHTML = ''; // Clear existing list

    // Create a list item for the headings
    const headingRow = document.createElement('li');
    headingRow.classList = 'c-list__item';
    headingRow.innerHTML = `
        <div class="c-list__grid">
            <div class="u-text--left u-text--small u-text--medium">Rank</div>
            <div class="u-text--left u-text--small u-text--medium">Commodity</div>
            <div class="u-text--right u-text--small u-text--medium"># of Points</div>
        </div>
    `;
    // Append the headings row to the list
    list.appendChild(headingRow);

    // Loop through ranked partners and render each partner
    rankedPartners.forEach((partner, index) => {
        const newRow = document.createElement('li');
        newRow.classList = 'c-list__item';
        newRow.innerHTML = `
            <div class="c-list__grid">
                <div class="c-flag c-place u-bg--transparent">${index + 1}</div>
                <div class="c-media">
                    <img class="c-avatar c-media__img" src="${partner.logo ?? ''}" />
                    <div class="c-media__content">
                        <div class="c-media__title">${partner.userId?.name ?? ''}</div>
                        <a class="c-media__link u-text--small" href="${partner.socials ?? ''}" target="_blank">@${partner.socials ?? ''}</a>
                    </div>
                </div>
                <div class="u-text--right c-quadb_ratio">
                    <div class="u-mt--8">
                        <strong>${partner.leaderboardRanking.toFixed(2)}</strong> ${randomEmoji()}
                    </div>
                </div>
            </div>
        `;
        if (index === 0) {
            newRow.querySelector('.c-place').classList.add('u-text--dark');
            newRow.querySelector('.c-place').classList.add('u-bg--yellow');
        } else if (index === 1) {
            newRow.querySelector('.c-place').classList.add('u-text--dark');
            newRow.querySelector('.c-place').classList.add('u-bg--teal');
        } else if (index === 2) {
            newRow.querySelector('.c-place').classList.add('u-text--dark');
            newRow.querySelector('.c-place').classList.add('u-bg--orange');
        }
        list.appendChild(newRow);
    });

 // Find the partner with the highest order count
    const partnerWithMaxOrders = rankedPartners.reduce((prevPartner, currentPartner) => {
        return prevPartner.ordersPlaced > currentPartner.ordersPlaced ? prevPartner : currentPartner;
    }, { ordersPlaced: -Infinity });


    // Render winner card with the partner who has the highest order count
    const winnerCard = document.getElementById('winner');
    if (partnerWithMaxOrders) {
        winnerCard.innerHTML = `
            <div class="u-text-small u-text--medium u-mb--16">Top Order Contributor</div>
            <img class="c-avatar c-avatar--lg" src="${partnerWithMaxOrders.logo ?? ''}" />
            <h3 class="u-mt--16">${partnerWithMaxOrders.userId?.name ?? ''}</h3>
            <span class="u-text--teal u-text--small">${partnerWithMaxOrders.userId?.name ?? ''}</span>
        `;
    }

}


// Call renderLeaderboard to initiate rendering
renderLeaderboard();
