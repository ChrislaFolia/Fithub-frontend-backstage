<template>
  <a
    class="nav-link collapsed"
    href="#"
    data-bs-toggle="collapse"
    data-bs-target="#collapseLayouts1"
    aria-expanded="false"
    aria-controls="collapseLayouts"
  >
    <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
    組織管理
    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
  </a>
  <div
    class="collapse"
    id="collapseLayouts1"
    aria-labelledby="headingOne"
    data-bs-parent="#sidenavAccordion"
  >
    <nav class="sb-sidenav-menu-nested nav">
      <router-link class="nav-link" to="department">部門分類</router-link>
      <a class="nav-link" href="employee">員工管理</a>
    </nav>
  </div>
</template>
