const SITE_MENU_SELECTOR = '.site-menu';
const SITE_MENU_OPEN_ATTRIBUTE = 'open';
const SITE_MENU_LINK_SELECTOR = '.site-menu-panel a';

function closeSiteMenus(siteMenus) {
  siteMenus.forEach(siteMenu => siteMenu.removeAttribute(SITE_MENU_OPEN_ATTRIBUTE));
}

function isPointerInsideSiteMenu(event, siteMenus) {
  return siteMenus.some(siteMenu => siteMenu.contains(event.target));
}

/**
 * 移动端菜单在《牛马日志》官网里只是临时导航层，用户点页面其他区域时应立即收起。
 * 这里不改 details 的原生开合能力，只补外部触碰关闭，避免移动端菜单残留遮挡正文。
 */
function bindSiteMenuDismissal() {
  const siteMenus = Array.from(document.querySelectorAll(SITE_MENU_SELECTOR));
  if (siteMenus.length === 0) {
    return;
  }

  document.addEventListener('pointerdown', event => {
    if (isPointerInsideSiteMenu(event, siteMenus)) {
      return;
    }

    closeSiteMenus(siteMenus);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') {
      return;
    }

    closeSiteMenus(siteMenus);
  });

  siteMenus.forEach(siteMenu => {
    siteMenu.querySelectorAll(SITE_MENU_LINK_SELECTOR).forEach(siteMenuLink => {
      siteMenuLink.addEventListener('click', () => closeSiteMenus(siteMenus));
    });
  });
}

bindSiteMenuDismissal();
