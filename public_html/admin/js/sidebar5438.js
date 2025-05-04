(function () {
    "use strict";
    const sidebarInit = () => {
        const sidebarType = IQSetting.options.setting.sidebar_type.value
        const newTypes = sidebarType
        const sidebarResponsive = document.querySelector('[data-sidebar="responsive"]')
        if (window.innerWidth < 1025) {
            if (sidebarResponsive !== null) {
                if (!sidebarResponsive.classList.contains('sidebar-mini')) {
                    newTypes.push('sidebar-mini')
                }
            }
        } else {
            if (sidebarResponsive !== null) {
                if (sidebarResponsive.classList.contains('sidebar-mini')) {
                    const indexOf = newTypes.findIndex(x => x == 'sidebar-mini')
                    newTypes.splice(indexOf, 1)
                }
            }
        }
        IQSetting.sidebar_type(newTypes)
    }
    sidebarInit()
    window.addEventListener('resize', function (event) {
        sidebarInit()
    });

    /*-------------Sidebar Toggle Start-----------------*/
    function updateSidebarType() {
        if (typeof IQSetting !== typeof undefined) {
            const sidebarType = IQSetting.options.setting.sidebar_type.value
            const newTypes = sidebarType
            if (sidebarType.includes('sidebar-mini')) {
                const indexOf = newTypes.findIndex(x => x == 'sidebar-mini')
                newTypes.splice(indexOf, 1)
            } else {
                newTypes.push('sidebar-mini')
            }
            IQSetting.sidebar_type(newTypes)
        }
    }
    const sidebarToggle = (elem) => {
        elem.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar')
            if (sidebar.classList.contains('sidebar-mini')) {
                sidebar.classList.remove('sidebar-mini')
                updateSidebarType()
            } else {
                sidebar.classList.add('sidebar-mini')
                updateSidebarType()
            }
        })
    }
    const sidebarToggleBtn = document.querySelectorAll('[data-toggle="sidebar"]')
    const sidebar = document.querySelector('[data-toggle="main-sidebar"]')
    if (sidebar !== null) {
        const sidebarActiveItem = sidebar.querySelectorAll('.active')
        Array.from(sidebarActiveItem, (elem) => {
            elem.classList.add('active')
            if (!elem.closest('ul').classList.contains('iq-main-menu')) {
                const childMenu = elem.closest('ul')
                const parentMenu = childMenu.closest('li').querySelector('.nav-link')
                parentMenu.classList.add('active')
                new bootstrap.Collapse(childMenu, {
                    toggle: true
                });
            }
        })
        const collapseElementList = [].slice.call(sidebar.querySelectorAll('.collapse'))
        const collapseList = collapseElementList.map(function (collapseEl) {
            collapseEl.addEventListener('show.bs.collapse', function (elem) {
                collapseEl.closest('li').classList.add('active')
            })
            collapseEl.addEventListener('hidden.bs.collapse', function (elem) {
                collapseEl.closest('li').classList.remove('active')
            })
        })

        const active = sidebar.querySelector('.active')
        if (active !== null) {
            active.closest('li').classList.add('active')
        }
    }
    Array.from(sidebarToggleBtn, (sidebarBtn) => {
        sidebarToggle(sidebarBtn)
    })
    /*-------------Sidebar Toggle End-----------------*/






})()

// document.addEventListener('DOMContentLoaded', function () {

//     //add first
//     var aside = document.querySelector('.sidebartab');

//     aside.classList.add('sidebar-hover', 'sidebar-mini');

//     document.querySelector('.wrapper-menu').addEventListener('click', function () {
//         this.classList.toggle('open');
//         if (aside.classList.contains('sidebar-hover') && aside.classList.contains('sidebar-mini')) {
//             aside.classList.remove('sidebar-hover', 'sidebar-mini');
//             aside.classList.add('new-class');
//         } else {
//             aside.classList.remove('new-class');
//             aside.classList.add('sidebar-hover', 'sidebar-mini');
//         }
//     });


// });
// document.addEventListener('DOMContentLoaded', function () {

//     var aside1 = document.querySelector('.sidebartab1');

//     document.querySelector('.wrapper-menu').addEventListener('click', function () {
//         this.classList.toggle('open');

//         if (aside1.classList.contains('sidebar-hover') && aside1.classList.contains('sidebar-mini')) {
//             aside1.classList.remove('sidebar-hover', 'sidebar-mini', 'newclass');

//         } else {
//             aside1.classList.add('sidebar-hover', 'sidebar-mini', "newclass");
//             aside1.classList.remove('another-class');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    // Initialize elements
    var aside = document.querySelector('.sidebartab');
    var aside1 = document.querySelector('.sidebartab1');
    var wrapperMenu = document.querySelector('.wrapper-menu');

    // Add initial classes if aside element exists
    if (aside) {
        aside.classList.add('sidebar-hover', 'sidebar-mini');
    }

    // Event listener for wrapper menu click if wrapperMenu element exists
    if (wrapperMenu) {
        wrapperMenu.addEventListener('click', function () {
            this.classList.toggle('open');

            // Toggle classes for aside if it exists
            if (aside) {
                if (aside.classList.contains('sidebar-hover') && aside.classList.contains('sidebar-mini')) {
                    aside.classList.remove('sidebar-hover', 'sidebar-mini');
                    aside.classList.add('new-class');
                } else {
                    aside.classList.remove('new-class');
                    aside.classList.add('sidebar-hover', 'sidebar-mini');
                }
            }

            // Toggle classes for aside1 if it exists
            if (aside1) {
                if (aside1.classList.contains('sidebar-hover') && aside1.classList.contains('sidebar-mini')) {
                    aside1.classList.remove('sidebar-hover', 'sidebar-mini', 'newclass');
                } else {
                    aside1.classList.add('sidebar-hover', 'sidebar-mini', 'newclass');
                    aside1.classList.remove('another-class');
                }
            }
        });
    }
});



//scroll
// window.addEventListener('scroll', function () {

//     var scrollTop = window.scrollY || document.documentElement.scrollTop;

//     var navbar = document.querySelector('.iq-navbar');

//     if (scrollTop >= 75) {

//         navbar.classList.add('fixed-header');
//     } else {

//         navbar.classList.remove('fixed-header');
//     }
// });

window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var navbar = document.querySelector('.iq-navbar');

    if (scrollTop >= 75) {
        navbar.classList.add('fixed-header');
    } else {
        navbar.classList.remove('fixed-header');
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var navbar = document.querySelector('.iq-navbar');

    if (scrollTop >= 75) {
        navbar.classList.add('fixed-header');
    } else {
        navbar.classList.remove('fixed-header');
    }
});


//cutomizer
document.addEventListener("DOMContentLoaded", function() {
    // Get the source element
    var sourceElement = document.getElementById("page_layout");
    
    // Get the destination element
    var destinationElement = document.getElementById("boxid");

    // Function to update the class on the destination element
    function updateClass() {
        if (sourceElement.classList.contains("container")) {
            destinationElement.classList.add("container-box");
        } else {
            destinationElement.classList.remove("container-box");
        }
    }

    // Initial check
    updateClass();
    var observer = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                updateClass();
            }
        }
    });
    observer.observe(sourceElement, { attributes: true });

});






