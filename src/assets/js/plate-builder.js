(function () {
    var regInput = document.getElementById('pb-reg-input');
    var frontReg = document.getElementById('pb-front-reg');
    var rearReg = document.getElementById('pb-rear-reg');
    var rearWrap = document.getElementById('pb-rear-wrap');
    var preview = document.getElementById('pb-preview');
    var orderBtn = document.getElementById('pb-order-btn');
    var frontBadge = document.getElementById('pb-front-badge');
    var rearBadge = document.getElementById('pb-rear-badge');
    var styleName = document.getElementById('pb-style-name');

    var styleLabels = {
        'standard': 'Standard',
        '3d-gel': '3D Gel',
        '4d-gel': '4D Gel',
        '4d-laser': '4D Laser',
        '4d-retro': '4D Retro/Bevelled',
        'tinted': 'Tinted'
    };

    // Strip non-alphanumeric chars, uppercase, limit length
    function formatReg(val) {
        return val.toUpperCase().replace(/[^A-Z0-9 ]/g, '').substring(0, 9);
    }

    // Auto-insert space after 4 chars (AB12 CDE format)
    function autoSpace(val) {
        var c = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
        return c.length > 4 ? c.slice(0, 4) + ' ' + c.slice(4, 8) : c;
    }

    function badgeHTML(badge) {
        if (badge === 'none') return '';
        var flags = { GB: '🇬🇧', UK: '🇬🇧' };
        var f = flags[badge] || '';
        return '<div class="pb-badge-inner">' +
            '<span class="pb-badge-flag">' + f + '</span>' +
            '<span class="pb-badge-text">' + badge + '</span>' +
            '</div>';
    }

    function update() {
        // Reg display
        var raw = regInput.value;
        var display = autoSpace(raw) || 'AB12 CDE';
        frontReg.textContent = display;
        rearReg.textContent = display;

        // Style
        var style = document.querySelector('input[name="plate-style"]:checked').value;
        preview.className = 'pb-preview style-' + style;
        styleName.textContent = styleLabels[style] || style;

        // Badge
        var badge = document.querySelector('input[name="plate-badge"]:checked').value;
        var bHTML = badgeHTML(badge);
        frontBadge.innerHTML = bHTML;
        rearBadge.innerHTML = bHTML;
        frontBadge.className = 'pb-badge' + (badge === 'none' ? ' hidden' : '');
        rearBadge.className = 'pb-badge' + (badge === 'none' ? ' hidden' : '');

        // Single or pair
        var type = document.querySelector('input[name="plate-type"]:checked').value;
        var isPair = type === 'pair';
        rearWrap.style.display = isPair ? '' : 'none';

        // Build pre-filled WhatsApp message
        var msg =
            'Hi,\n\nI\'d like to order number plates.\n\n' +
            'Reg: ' + display + '\n' +
            'Style: ' + (styleLabels[style] || style) + '\n' +
            'Single or Pair: ' + (isPair ? 'Pair (Front + Rear)' : 'Single Plate') + '\n' +
            'Badge: ' + (badge === 'none' ? 'No badge' : badge + ' badge') + '\n' +
            'Delivery or Collection: []\n' +
            'Postcode (if delivery): []';

        orderBtn.href = 'https://wa.me/+447555656247?text=' + encodeURIComponent(msg);
    }

    // Reg input — format and update
    regInput.addEventListener('input', function () {
        this.value = formatReg(this.value);
        update();
    });

    // All radio inputs
    ['plate-style', 'plate-badge', 'plate-type'].forEach(function (name) {
        document.querySelectorAll('input[name="' + name + '"]').forEach(function (el) {
            el.addEventListener('change', update);
        });
    });

    // Initial render
    update();
})();
