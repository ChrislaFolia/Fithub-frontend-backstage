<template>
	<a class="nav-link collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayoutsCourse"
		aria-expanded="false" aria-controls="collapseLayouts">
		<div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
		課程管理
		<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
	</a>
	<div class="collapse" id="collapseLayoutsCourse" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
		<nav class="sb-sidenav-menu-nested nav">
			<router-link class="nav-link" to="course">課程分類管理</router-link>
			<router-link class="nav-link" to="classes">全部課程管理</router-link>
		</nav>
	</div>
</template>
