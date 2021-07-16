const BTN = document.querySelectorAll('button[name="tab-action"]');
const TABS = document.querySelectorAll('div[name="tab"]');
const UI = (() => {
    const deactivate_btns = () => {
        BTN.forEach((elem) => {
            elem.classList.remove('active');
        });
    }

    const hide_tabs = () => {
        TABS.forEach((elem) => {
            elem.classList.remove('d-block');
            elem.classList.add('d-none');
        });
    }

    const show_tab = (tab_id) => {
        TABS.forEach((elem) => {
            if (elem.id == tab_id)
            {
                elem.classList.remove('d-none');
                elem.classList.add('d-block');
            }
        })
    }

    return {deactivate_btns, hide_tabs, show_tab}
})();

BTN.forEach((elem) => {
    elem.addEventListener('click', () => {
        UI.deactivate_btns();
        UI.hide_tabs();

        elem.classList.add('active');
        UI.show_tab(elem.getAttribute('tab-reference'));
    });
});
