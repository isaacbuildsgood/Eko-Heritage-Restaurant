document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE MENU TOGGLE
    ========================================= */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');

        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Toggle hamburger animation (optional)
            const spans = hamburger.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    /* =========================================
       2. STICKY NAVBAR EFFECT
    ========================================= */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* =========================================
       3. MENU FILTERING LOGIC
    ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    if (filterBtns.length > 0 && menuCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Show/Hide cards based on filter
                menuCards.forEach(card => {
                    // Reset display and basic animation states to re-trigger them later if needed
                    card.style.display = 'none';

                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Re-trigger animation
                        setTimeout(() => {
                            card.classList.add('active');
                        }, 50); // small delay to allow DOM update
                    } else {
                        card.classList.remove('active');
                    }
                });

                // Clear search input when filtering
                if (searchInput) {
                    searchInput.value = '';
                    noResults.style.display = 'none';
                }
            });
        });
    }

    /* =========================================
       3.5. MENU SEARCH LOGIC
    ========================================= */
    const searchInput = document.getElementById('menuSearch');
    const noResults = document.getElementById('noResults');
    if (searchInput && menuCards.length > 0) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            // If searching, reset filter to 'all'
            if (query !== '') {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-filter="all"]').classList.add('active');
            }

            menuCards.forEach(card => {
                const name = card.getAttribute('data-name') || '';
                const category = card.getAttribute('data-category') || '';
                const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

                const matches = query === '' || name.toLowerCase().includes(query) ||
                               category.toLowerCase().includes(query) ||
                               description.includes(query);

                if (matches) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (visibleCount === 0 && query !== '') {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        });
    }

    /* =========================================
       4. SCROLL REVEAL ANIMATION
    ========================================= */
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point offset

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    // Listen for scroll
    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    /* =========================================
       5. RESERVATION FORM HANDLING
    ========================================= */
    const bookingForm = document.getElementById('bookingForm');
    const dateInput = document.getElementById('date');
    
    // Smart Reservation Logic for Events
    const urlParams = new URLSearchParams(window.location.search);
    const eventType = urlParams.get('event');
    
    if (dateInput) {
        if (eventType === 'valentines') {
            // Auto-fill for Valentine's
            const valDate = new Date().getFullYear() + '-02-14'; // Or 2027-02-14 if fixed
            dateInput.value = valDate;
            dateInput.setAttribute('readonly', true);
            document.getElementById('time').value = '19:00';
            document.getElementById('type').value = 'event';
            document.getElementById('requests').value = "Booking for: A Night of Romance Gala";
            
            // Add custom banner
            const resContent = document.querySelector('.reservation-content');
            if (resContent) {
                const banner = document.createElement('div');
                banner.style.background = 'rgba(214, 90, 49, 0.2)';
                banner.style.border = '1px solid var(--accent-color)';
                banner.style.color = '#fff';
                banner.style.padding = '15px';
                banner.style.borderRadius = '8px';
                banner.style.marginBottom = '20px';
                banner.innerHTML = "<strong>✨ Special Event:</strong> You are reserving a table for the Valentine's Day Gala!";
                resContent.appendChild(banner);
            }
        } else if (eventType === 'womens-day') {
            // Auto-fill for Women's Day
            const wdDate = new Date().getFullYear() + '-03-08';
            dateInput.value = wdDate;
            dateInput.setAttribute('readonly', true);
            document.getElementById('time').value = '11:00';
            document.getElementById('type').value = 'event';
            document.getElementById('requests').value = "Booking for: Queens of Heritage Brunch";
            
            // Add custom banner
            const resContent = document.querySelector('.reservation-content');
            if (resContent) {
                const banner = document.createElement('div');
                banner.style.background = 'rgba(214, 90, 49, 0.2)';
                banner.style.border = '1px solid var(--accent-color)';
                banner.style.color = '#fff';
                banner.style.padding = '15px';
                banner.style.borderRadius = '8px';
                banner.style.marginBottom = '20px';
                banner.innerHTML = '<strong>✨ Special Event:</strong> You are reserving a spot for the Queens of Heritage Brunch!';
                resContent.appendChild(banner);
            }
        } else {
            // Restrict date to today only for standard bookings
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            dateInput.setAttribute('max', today);
        }
    }
    
    let pendingReservation = null;

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!isLoggedIn()) {
                showLoginPrompt();
                return;
            }
            
            // Send to Formspree Silently
            fetch('https://formspree.io/f/mykloglr', {
                method: 'POST',
                body: new FormData(bookingForm),
                headers: { 'Accept': 'application/json' }
            }).catch(error => console.log('Formspree reservation error:', error));

            // Save details temporarily
            pendingReservation = {
                id: 'res-' + Date.now(),
                name: "Table Booking (" + document.getElementById('time').value + ")",
                price: 10, // ₦10 booking fee if linked with food
                quantity: 1,
                isReservation: true
            };

            // Show Custom Modal
            const modalOverlay = document.getElementById('resModalOverlay');
            const modalBox = document.getElementById('resModalBox');
            if (modalOverlay && modalBox) {
                document.getElementById('resModalStep1').style.display = 'block';
                document.getElementById('resModalStep2').style.display = 'none';
                
                modalOverlay.style.visibility = 'visible';
                modalOverlay.style.opacity = '1';
                setTimeout(() => { modalBox.style.transform = 'translateY(0)'; }, 50);
            }
        });
    }
    
    // Modal Button Listeners
    const btnOrderedYes = document.getElementById('btnOrderedYes');
    const btnOrderedNo = document.getElementById('btnOrderedNo');
    const btnOrderNow = document.getElementById('btnOrderNow');
    const btnOrderLater = document.getElementById('btnOrderLater');
    
    function closeResModal() {
        const modalOverlay = document.getElementById('resModalOverlay');
        const modalBox = document.getElementById('resModalBox');
        if(modalOverlay && modalBox) {
            modalBox.style.transform = 'translateY(50px)';
            setTimeout(() => { 
                modalOverlay.style.opacity = '0';
                modalOverlay.style.visibility = 'hidden'; 
            }, 400);
        }
    }

    if (btnOrderedYes) {
        btnOrderedYes.addEventListener('click', () => {
            // Already ordered food, so we assume food is in tray or they've sorted it. Add reservation to tray.
            addReservationToTray(pendingReservation);
            
            // Log History
            const reservationId = '#EKO-' + Math.floor(1000 + Math.random() * 9000);
            const reservationDetails = 'Date: ' + document.getElementById('date').value + ' | Time: ' + document.getElementById('time').value + ' | Guests: ' + document.getElementById('guests').value;
            let history = JSON.parse(localStorage.getItem('ekoHistory')) || [];
            history.push({
                id: reservationId,
                date: new Date().toISOString(),
                type: 'Table Reservation',
                details: reservationDetails
            });
            localStorage.setItem('ekoHistory', JSON.stringify(history));

            if (window.saveFirestoreReservation) {
                window.saveFirestoreReservation({
                    orderId: reservationId,
                    date: new Date().toISOString(),
                    type: 'Table Reservation',
                    details: reservationDetails,
                    reservationType: 'Linked Reservation'
                }).catch(error => {
                    console.error('Firestore reservation save failed:', error);
                });
            }

            closeResModal();
            bookingForm.reset();
            alert('Reservation linked! Please proceed to checkout your tray.');
            // Optionally redirect to menu to checkout
            window.location.href = 'menu.html';
        });
    }

    if (btnOrderedNo) {
        btnOrderedNo.addEventListener('click', () => {
            // Show step 2
            document.getElementById('resModalStep1').style.display = 'none';
            document.getElementById('resModalStep2').style.display = 'block';
        });
    }

    if (btnOrderNow) {
        btnOrderNow.addEventListener('click', () => {
            // Add table to tray with fee logic and redirect to menu to order
            addReservationToTray(pendingReservation);
            closeResModal();
            bookingForm.reset();
            window.location.href = 'menu.html';
        });
    }

    if (btnOrderLater) {
        btnOrderLater.addEventListener('click', () => {
            // Standard booking, no fee (₦0 price constraint as per user instruction).
            
            // Log History
            const reservationId = '#EKO-' + Math.floor(1000 + Math.random() * 9000);
            const reservationDetails = 'Date: ' + document.getElementById('date').value + ' | Time: ' + document.getElementById('time').value + ' | Guests: ' + document.getElementById('guests').value;
            let history = JSON.parse(localStorage.getItem('ekoHistory')) || [];
            history.push({
                id: reservationId,
                date: new Date().toISOString(),
                type: 'Table Reservation',
                details: reservationDetails
            });
            localStorage.setItem('ekoHistory', JSON.stringify(history));

            if (window.saveFirestoreReservation) {
                window.saveFirestoreReservation({
                    orderId: reservationId,
                    date: new Date().toISOString(),
                    type: 'Table Reservation',
                    details: reservationDetails,
                    reservationType: 'Standard Booking'
                }).catch(error => {
                    console.error('Firestore reservation save failed:', error);
                });
            }

            closeResModal();
            bookingForm.reset();
            alert('Standard table successfully booked. We look forward to hosting you today!');
        });
    }

});

/* =========================================
   6. TRAY (CART) SYSTEM
========================================= */
let tray = JSON.parse(localStorage.getItem('ekoTray')) || [];

function isLoggedIn() {
    return localStorage.getItem('ekoLoggedInUser') !== null;
}

function showLoginPrompt() {
    const modal = document.getElementById('loginModalOverlay');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hideLoginModal() {
    const modal = document.getElementById('loginModalOverlay');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Update login button visibility based on auth status
function updateLoginButtonVisibility() {
    const loginBtn = document.getElementById('menuLoginBtn');
    const trayBtn = document.getElementById('floatingTrayBtn');
    const navActivity = document.getElementById('navActivityLink');
    const mobileActivity = document.getElementById('mobileActivityLink');
    const loggedIn = isLoggedIn();

    if (loginBtn) {
        loginBtn.classList.toggle('hidden-ui', loggedIn);
    }

    if (trayBtn) {
        trayBtn.classList.toggle('hidden-ui', !loggedIn);
    }

    if (navActivity) {
        navActivity.style.display = loggedIn ? 'inline-block' : 'none';
    }

    if (mobileActivity) {
        mobileActivity.style.display = loggedIn ? 'block' : 'none';
    }
}

// Initialize login button visibility
updateLoginButtonVisibility();

function saveTray() {
    localStorage.setItem('ekoTray', JSON.stringify(tray));
}

function addReservationToTray(resItem) {
    // Only one active reservation allowed per cart, filter out old ones
    tray = tray.filter(item => !item.isReservation);
    tray.push(resItem);
    saveTray();
    updateTrayUI();
}

function toggleTray() {
    const panel = document.getElementById('trayPanel');
    const overlay = document.getElementById('trayOverlay');
    if (panel && overlay) {
        panel.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function addToTray(id) {
    if (!isLoggedIn()) {
        showLoginPrompt();
        return;
    }

    const card = document.querySelector(`.menu-card[data-id="${id}"]`);
    if (!card) return;

    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'));
    const imgEl = card.querySelector('.menu-img-wrapper img') || card.querySelector('img');
    const image = (imgEl && imgEl.src) ? imgEl.src : '';

    const existingItem = tray.find(item => item.id === id && !item.isReservation);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        tray.push({ id, name, price, quantity: 1, image, isReservation: false });
    }

    saveTray();
    updateTrayUI();
}

function updateItemQuantity(id, change) {
    const itemIndex = tray.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        // Prevent changing quantity of reservation
        if(tray[itemIndex].isReservation) return;
        
        tray[itemIndex].quantity += change;
        if (tray[itemIndex].quantity <= 0) {
            tray.splice(itemIndex, 1);
        }
        saveTray();
        updateTrayUI();
    }
}

function removeFromTray(id) {
    tray = tray.filter(item => item.id !== id);
    saveTray();
    updateTrayUI();
}

function updateTrayUI() {
    const trayContainer = document.getElementById('trayItems');
    const totalAmountEl = document.getElementById('trayTotalAmount');
    const badgeEl = document.getElementById('trayBadge');
    
    if (!trayContainer || !totalAmountEl || !badgeEl) return;

    // Update Badge
    const totalItems = tray.reduce((sum, item) => sum + item.quantity, 0);
    badgeEl.textContent = totalItems;
    badgeEl.style.display = totalItems > 0 ? 'flex' : 'none';

    // Calculate Total
    const totalAmount = tray.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Format to Naira string
    totalAmountEl.textContent = '₦' + totalAmount.toLocaleString('en-US');

    // Render Items
    if (tray.length === 0) {
        trayContainer.innerHTML = '<p class="empty-tray-msg">Your serving tray is empty.</p>';
        return;
    }

    trayContainer.innerHTML = tray.map(item => {
        const imageUrl = item.image || '';
        return `
        <div class="tray-item" style="${item.isReservation ? 'border-left: 3px solid var(--accent-color); padding-left: 10px; background: rgba(214, 90, 49, 0.05);' : ''}">
            ${imageUrl && !item.isReservation ? `<div class="tray-item-media"><img src="${imageUrl}" alt="${item.name}" /></div>` : ''}
            <div class="tray-item-info">
                <h4>${item.name}</h4>
                <p>₦${(item.price * item.quantity).toLocaleString('en-US')}</p>
            </div>
            <div class="tray-item-actions">
                ${item.isReservation 
                    ? `<span style="color: var(--secondary-color); font-size: 0.8rem; text-transform: uppercase;">Linked</span>` 
                    : `<div class="qty-controls">
                        <button class="qty-btn" onclick="updateItemQuantity('${item.id}', -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateItemQuantity('${item.id}', 1)">+</button>
                       </div>`
                }
                <button class="remove-item" onclick="removeFromTray('${item.id}')">&times;</button>
            </div>
        </div>
    `;
    }).join('');
}

function proceedToCheckout() {
    if (tray.length === 0) {
        alert('Your tray is empty! Add some delicious meals first.');
        return;
    }
    window.location.href = 'checkout.html';
}

// Initial UI setup on load
document.addEventListener('DOMContentLoaded', () => {
    updateTrayUI();
});

/* =========================================
   7. CHECKOUT LOGIC
========================================= */
const checkoutMain = document.getElementById('checkoutMainContainer');
if (checkoutMain) {
    const emptyBox = document.getElementById('emptyCheckoutBox');
    const chkList = document.getElementById('checkoutItemsList');
    const chkSubtotal = document.getElementById('chkSubtotal');
    const chkTotal = document.getElementById('chkTotal');
    const chkDeliveryRow = document.getElementById('chkDeliveryRow');
    
    const btnDel = document.getElementById('btnDeliveryToggle');
    const btnDine = document.getElementById('btnDineInToggle');
    const delFields = document.getElementById('deliveryFields');
    const dineFields = document.getElementById('dineInFields');
    const resWarning = document.getElementById('reservationWarning');
    
    let isDelivery = true;
    const deliveryFee = 2500;
    let hasReservation = tray.some(item => item.isReservation);

    function renderCheckout() {
        if (tray.length === 0) {
            checkoutMain.style.display = 'none';
            emptyBox.style.display = 'block';
            return;
        }

        chkList.innerHTML = tray.map(item => {
            const imageUrl = item.image || '';
            return `
            <div class="order-summary-item" style="${item.isReservation ? 'border-left: 2px solid var(--accent-color); padding-left: 10px; opacity: 0.9;' : ''}">
                ${imageUrl && !item.isReservation ? `<div class="order-summary-image"><img src="${imageUrl}" alt="${item.name}" /></div>` : ''}
                <div class="order-summary-details">
                    <span class="order-summary-name">${item.name}</span>
                    <span class="order-summary-qty">x${item.quantity}</span>
                    ${item.isReservation ? '<span class="order-summary-linked">Linked Table</span>' : ''}
                </div>
                <div class="order-summary-price">₦${(item.price * item.quantity).toLocaleString('en-US')}</div>
            </div>
        `;
        }).join('');

        const subtotal = tray.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        chkSubtotal.textContent = '₦' + subtotal.toLocaleString('en-US');

        if (hasReservation) {
            isDelivery = false;
            btnDel.disabled = true;
            btnDel.style.opacity = '0.5';
            btnDel.style.cursor = 'not-allowed';
            btnDine.classList.add('active');
            btnDel.classList.remove('active');
            resWarning.style.display = 'block';
        }

        if (isDelivery) {
            chkDeliveryRow.style.display = 'flex';
            chkTotal.textContent = '₦' + (subtotal + deliveryFee).toLocaleString('en-US');
            delFields.style.display = 'block';
            dineFields.style.display = 'none';
            document.getElementById('streetAddr').required = true;
            const cityField = document.getElementById('city');
            if (cityField) cityField.required = true;
        } else {
            chkDeliveryRow.style.display = 'none';
            chkTotal.textContent = '₦' + subtotal.toLocaleString('en-US');
            delFields.style.display = 'none';
            dineFields.style.display = 'block';
            document.getElementById('streetAddr').required = false;
            const cityField = document.getElementById('city');
            if (cityField) cityField.required = false;
        }
    }

    if (!hasReservation) {
        btnDel.addEventListener('click', (e) => {
            e.preventDefault();
            isDelivery = true;
            btnDel.classList.add('active');
            btnDine.classList.remove('active');
            renderCheckout();
        });
    }

    btnDine.addEventListener('click', (e) => {
        e.preventDefault();
        isDelivery = false;
        btnDine.classList.add('active');
        btnDel.classList.remove('active');
        renderCheckout();
    });

    renderCheckout();

    const checkoutForm = document.getElementById('checkoutForm');
    if(checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form Validation
            const fullName = document.querySelector('input[name="full_name"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const phone = document.querySelector('input[name="phone"]').value.trim();
            const streetAddr = document.querySelector('input[name="street_address"]').value.trim();
            
            if (!fullName) {
                alert('Please enter your full name.');
                return;
            }
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            if (!phone) {
                alert('Please enter your phone number.');
                return;
            }
            if (isDelivery && !streetAddr) {
                alert('Please enter your delivery address.');
                return;
            }
            
            // Populate hidden detail for Formspree
            const hiddenOrderDesc = document.getElementById('formspreeOrderDetails');
            if (hiddenOrderDesc) {
                const orderText = tray.map(item => `${item.quantity}x ${item.name} (₦${(item.price * item.quantity).toLocaleString()})`).join(', ');
                const totalAmt = document.getElementById('chkTotal').textContent;
                const typeText = isDelivery ? 'Home Delivery' : 'Dine-In Support';
                hiddenOrderDesc.value = `Order Type: ${typeText} | Items: ${orderText} | GRAND TOTAL: ${totalAmt}`;
            }
            
            const btnText = document.getElementById('btnText');
            const loader = document.getElementById('btnLoader');
            btnText.textContent = 'Authenticating...';
            loader.style.display = 'inline-block';
            
            // Send to Formspree Silently
            fetch('https://formspree.io/f/mykloglr', {
                method: 'POST',
                body: new FormData(checkoutForm),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    const receipt = document.getElementById('receiptModal');
                    const receiptBox = document.getElementById('receiptBox');
                    const finalId = document.getElementById('finalOrderId');
                    
                    finalId.textContent = '#EKO-' + Math.floor(1000 + Math.random() * 9000);
                    
                    // Save to Activity History
                    let history = JSON.parse(localStorage.getItem('ekoHistory')) || [];
                    history.push({
                        id: finalId.textContent,
                        date: new Date().toISOString(),
                        type: 'Food Order',
                        details: (isDelivery ? 'Home Delivery' : 'Dine-In Support') + ' | Items: ' + tray.length + ' | Total: ' + document.getElementById('chkTotal').textContent
                    });
                    localStorage.setItem('ekoHistory', JSON.stringify(history));

                    if (window.saveFirestoreOrder) {
                        window.saveFirestoreOrder({
                            orderId: finalId.textContent,
                            date: new Date().toISOString(),
                            type: 'Food Order',
                            details: (isDelivery ? 'Home Delivery' : 'Dine-In Support') + ' | Items: ' + tray.length + ' | Total: ' + document.getElementById('chkTotal').textContent,
                            total: document.getElementById('chkTotal').textContent,
                            itemCount: tray.length
                        }).catch(error => {
                            console.error('Firestore order save failed:', error);
                        });
                    }

                    receipt.style.display = 'flex';
                    setTimeout(() => {
                        receiptBox.style.transform = 'scale(1)';
                    }, 50);

                    tray = [];
                    saveTray();
                    btnText.textContent = 'Place Order';
                    loader.style.display = 'none';
                } else {
                    throw new Error('Formspree submission failed');
                }
            }).catch(error => {
                console.error('Submission error:', error);
                alert("Error submitting order. Please check your internet connection and try again.");
                btnText.textContent = 'Place Order';
                loader.style.display = 'none';
            });
        });
    }
}

/* =========================================
   8. CONTACT FORM FORMSPREE
========================================= */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('btnContactSubmit');
        const btnText = document.getElementById('contactBtnText');
        const originalText = btnText.textContent;
        btnText.textContent = 'Sending...';
        
        fetch('https://formspree.io/f/mykloglr', {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if(response.ok) {
                btnText.textContent = 'Message Sent ✓';
                btn.style.background = '#4CAF50';
                btn.style.color = 'white';
                contactForm.reset();
                setTimeout(() => {
                    btnText.textContent = originalText;
                    btn.style.background = '';
                }, 4000);
            } else {
                throw new Error("Network error");
            }
        }).catch(error => {
            btnText.textContent = 'Error Sending';
            console.error(error);
        });
    });
}
