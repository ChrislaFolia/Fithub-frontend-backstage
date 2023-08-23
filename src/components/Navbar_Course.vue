<template>
	<a class="nav-link collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts2"
		aria-expanded="false" aria-controls="collapseLayouts">
		<div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
		課程管理
		<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
	</a>
	<div class="collapse" id="collapseLayouts2" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
		<nav class="sb-sidenav-menu-nested nav">
			<router-link class="nav-link" to="course">課程管理</router-link>
			<!-- <router-link class="nav-link" to="classes">課程排程</router-link> -->
		</nav>
	</div>
</template>
