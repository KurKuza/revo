
var ua = window.navigator.userAgent
var msie = ua.indexOf("MSIE ")
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i) }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i) }, Windows: function () { return navigator.userAgent.match(/IEMobile/i) }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) } }
function isIE() {
	ua = navigator.userAgent
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1
	return is_ie
}
if (isIE()) {
	document.querySelector('html').classList.add('ie')
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch')
}

function testWebP(callback) {
	var webP = new Image()
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2)
	}
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp')
	} else {
		document.querySelector('html').classList.add('_no-webp')
	}
})

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg")
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
			}
		}
	}
}
ibg()

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded')
		}, 0)
	}
})

let unlock = true

//=================
//Menu
let iconMenu = document.querySelector(".icon-menu")
if (iconMenu != null) {
	let delay = 500
	let menuBody = document.querySelector(".right-panel")
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay)
			iconMenu.classList.toggle("_active")
			menuBody.classList.toggle("_active")
		}
	})
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu")
	let menuBody = document.querySelector(".right-panel")
	iconMenu.classList.remove("_active")
	menuBody.classList.remove("_active")
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body")
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay)
	} else {
		body_lock_add(delay)
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body")
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp")
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index]
				el.style.paddingRight = '0px'
			}
			body.style.paddingRight = '0px'
			body.classList.remove("_lock")
		}, delay)

		unlock = false
		setTimeout(function () {
			unlock = true
		}, delay)
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body")
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp")
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index]
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		body.classList.add("_lock")

		unlock = false
		setTimeout(function () {
			unlock = true
		}, delay)
	}
}
//=================
// LettersAnimation
let title = document.querySelectorAll('._letter-animation')
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index]
		let txt = el.innerHTML
		let txt_words = txt.replace('  ', ' ').split(' ')
		let new_title = ''
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index]
			let len = txt_word.length
			new_title = new_title + '<p>'
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1)
				if (it == ' ') {
					it = '&nbsp;'
				}
				new_title = new_title + '<span>' + it + '</span>'
			}
			el.innerHTML = new_title
			new_title = new_title + '&nbsp;</p>'
		}
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs")
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index]
	let tabs_items = tab.querySelectorAll("._tabs-item")
	let tabs_blocks = tab.querySelectorAll("._tabs-block")
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index]
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index]
				tabs_item.classList.remove('_active')
				tabs_blocks[index].classList.remove('_active')
			}
			tabs_item.classList.add('_active')
			tabs_blocks[index].classList.add('_active')
			e.preventDefault()
		})
	}
}

window.onload = function () {
	document.onclick('click', documentActions)

	function documentActions(e) {
		const targetElement = e.target
		if (targetElement.classList.contains('coffee__links')) {
			const productId = targetElement.closest('.coffee__item').dataset.pid
			addToCart(targetElement, o)
		};
	};
}
//BildSlider
let sliders = document.querySelectorAll('._swiper')
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index]
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index]
					el.classList.add('swiper-slide')
				}
			}
			let slider_content = slider.innerHTML
			let slider_wrapper = document.createElement('div')
			slider_wrapper.classList.add('swiper-wrapper')
			slider_wrapper.innerHTML = slider_content
			slider.innerHTML = ''
			slider.appendChild(slider_wrapper)
			slider.classList.add('swiper-bild')

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div')
				sliderScroll.classList.add('swiper-scrollbar')
				slider.appendChild(sliderScroll)
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback()
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll')
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index]
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		})
		sliderScroll.scrollbar.updateSize()
	}
}


function sliders_bild_callback(params) { }

let coffee_about = new Swiper('.coffee__swiper', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerColumn: 2,
	slidesPerView: 2.17,
	// autoHeight: false,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.coffee__item_next',
		prevEl: '.coffee__item_prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1.17,
			slidesPerColumn: 1,
		},
		768: {
			slidesPerView: 1.4,
			slidesPerColumn: 1,
		},
		992: {
			slidesPerView: 2.17,
			slidesPerColumn: 2,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg()
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
})

let combo_about = new Swiper('.combo__swiper', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	spaceBetween: 36,
	autoHeight: true,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	freeMode: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.combo__item_next',
		prevEl: '.combo__item_prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 15,
		},
		335: {
			slidesPerView: 1.01,
			spaceBetween: 15,
		},
		352: {
			slidesPerView: 1.08,
			spaceBetween: 30,
		},
		375: {
			slidesPerView: 1.1,
			spaceBetween: 15,
		},
		425: {
			slidesPerView: 1.3,
			spaceBetween: 30,
		},
		480: {
			slidesPerView: 1.55,
			spaceBetween: 30,
		},
		768: {
			slidesPerView: 2,
		},
		970: {
			slidesPerView: 2.4,
		},
		1024: {
			slidesPerView: 2.5,
		}
	},
	on: {
		lazyImageReady: function () {
			ibg()
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
})


let scr_body = document.querySelector('body')
let scr_blocks = document.querySelectorAll('._scr-sector')
let scr_items = document.querySelectorAll('._scr-item')
let scr_fix_block = document.querySelectorAll('._side-wrapper')
let scr_min_height = 750

let scrolling = true
let scrolling_full = true

let scrollDirection = 0

let currentScroll

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll)
function scroll_scroll() {
	let src_value = currentScroll = pageYOffset
	let header = document.querySelector('header.header')
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll')
		} else {
			header.classList.remove('_scroll')
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index]
			let block_offset = offset(block).top
			let block_height = block.offsetHeight

			if ((src_value > block_offset - block_height) && src_value < (block_offset + block_height) && window.innerHeight > scr_min_height && window.innerWidth > 992) {
				let scrProcent = (src_value - block_offset) / block_height * 100
				scrParallax(block, scrProcent, block_height)
			}

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active')
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active')
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current')
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current')
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index]
			let scr_item_offset = offset(scr_item).top
			let scr_item_height = scr_item.offsetHeight


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3)
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active')
				scroll_load_item(scr_item)
			} else {
				// scr_item.classList.remove('_active')
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item)
				}
			}
		}
	}
	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value)
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line')
	if (custom_scroll_line) {
		let window_height = window.innerHeight
		let content_height = document.querySelector('.wrapper').offsetHeight
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100
		let custom_scroll_line_height = custom_scroll_line.offsetHeight
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)"
	}
	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll()
}, 200)

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]')
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index]
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'))
				el.classList.add('_loaded')
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]')
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index]
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'))
				el.classList.add('_loaded')
			}
		}
	}
}
function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map')
		if (map_item) {
			scr_item.classList.add('_loaded-map')
			map()
		}
	}
}
function scrParallax(block, scrProcent, blockHeight) {
	let prlxItems = block.querySelectorAll('._prlx-item')
	if (prlxItems.length > 0) {
		for (let index = 0; index < prlxItems.length; index++) {
			const prlxItem = prlxItems[index]
			let prlxItemAttr = (prlxItem.dataset.prlx) ? prlxItem.dataset.prlx : 3
			const prlxItemValue = -1 * (blockHeight / 100 * scrProcent / prlxItemAttr)
			prlxItem.style.cssText = `transform: translateY(${prlxItemValue}px);`
		}
	}
}
//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll()
	window.addEventListener('wheel', full_scroll)

	let swiperScrolls = document.querySelectorAll('._swiper_scroll')

	if (swiperScrolls.length > 0) {
		for (let index = 0; index < swiperScrolls.length; index++) {
			const swiperScroll = swiperScrolls[index]
			swiperScroll.addEventListener("mouseenter", function (e) {
				window.removeEventListener('wheel', full_scroll)
			})
			swiperScroll.addEventListener("mouseleave", function (e) {
				window.addEventListener('wheel', full_scroll)
			})
		}
	}
}
function getPrevBlockPos(current_block_prev) {
	let viewport_height = window.innerHeight
	let current_block_prev_height = current_block_prev.offsetHeight
	let block_pos = offset(current_block_prev).top

	if (current_block_prev_height >= viewport_height) {
		block_pos = block_pos + (current_block_prev_height - viewport_height)
	}
	return block_pos
}
function full_scroll(e) {
	let viewport_height = window.innerHeight
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			let current_block = document.querySelector('._scr-sector._scr-sector_current')
			let current_block_pos = offset(current_block).top
			let current_block_height = current_block.offsetHeight
			let current_block_next = current_block.nextElementSibling
			let current_block_prev = current_block.previousElementSibling
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_prev) {
						full_scroll_to_sector(getPrevBlockPos(current_block_prev))
					}
				} else {
					enableScroll()
					if (currentScroll <= current_block_pos) {
						if (current_block_prev) {
							full_scroll_to_sector(getPrevBlockPos(current_block_prev))
						}
					}
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_next) {
						let block_pos = offset(current_block_next).top
						full_scroll_to_sector(block_pos)
					}
				} else {
					enableScroll()
					if (current_block_next) {
						let block_pos = offset(current_block_next).top
						if (currentScroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos)
						}
					}
				}
			}
		} else {
			disableScroll()
		}
	} else {
		enableScroll()
	}
}
function full_scroll_to_sector(pos) {
	disableScroll()
	scrolling_full = false
	_goto(pos, 800)

	let scr_pause = 500
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000
	};
	setTimeout(function () {
		scrolling_full = true
	}, scr_pause)
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block')
if (link) {
	let blocks = []
	for (let index = 0; index < link.length; index++) {
		let el = link[index]
		let block_name = el.getAttribute('href').replace('#', '')
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name)
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close()
				body_lock_remove(500)
			}
			let target_block_class = el.getAttribute('href').replace('#', '')
			let target_block = document.querySelector('.' + target_block_class)
			_goto(target_block, 300)
			e.preventDefault()
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active')
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index]
				el.classList.remove('_active')
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index]
			let block_item = document.querySelector('.' + block)
			if (block_item) {
				let block_offset = offset(block_item).top
				let block_height = block_item.offsetHeight
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]')
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index]
						current_link.classList.add('_active')
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto')
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index]
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '')
			let target_block = document.querySelector('.' + target_block_class)
			_goto(target_block, 1000)
			e.preventDefault()
		})
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = ''
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	}
	let scr = new SmoothScroll()
	scr.animateScroll(target_block, '', options)
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false)
	document.addEventListener('wheel', preventDefault, { passive: false }) // Disable scrolling in Chrome
	window.onwheel = preventDefault // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
	window.ontouchmove = preventDefault // mobile
	document.onkeydown = preventDefaultForScrollKeys
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false)
	document.removeEventListener('wheel', preventDefault, { passive: false }) // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null
	window.onwheel = null
	window.ontouchmove = null
	document.onkeydown = null
}
function preventDefault(e) {
	e = e || window.event
	if (e.preventDefault)
		e.preventDefault()
	e.returnValue = false
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth)
	let window_height = parseInt(window.innerHeight)
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index]
		let block_width = block.getAttribute('data-width')
		const item = block.querySelector('._side-block')
		if (!block_width) { block_width = 0 }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;"
				} else {
					gotoRelative(item)
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;"
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%"
				}
			} else {
				gotoRelative(item)
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;"
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden'
	let window_height = window.innerHeight
	let custom_scroll_line = document.querySelector('._custom-scroll__line')
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)))
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div')
			custom_scroll_line = document.createElement('div')
			custom_scroll.setAttribute('class', '_custom-scroll')
			custom_scroll_line.setAttribute('class', '_custom-scroll__line')
			custom_scroll.appendChild(custom_scroll_line)
			scr_body.appendChild(custom_scroll)
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px'
	}
}

let new_pos = pageYOffset
function scroll_animate(event) {
	let window_height = window.innerHeight
	let content_height = document.querySelector('.wrapper').offsetHeight
	let start_position = pageYOffset
	let pos_add = 100

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height
	if (new_pos < 0) new_pos = 0

	if (scrolling) {
		scrolling = false
		_goto(new_pos, 1000)

		let scr_pause = 100
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2
		};
		setTimeout(function () {
			scrolling = true
			_goto(new_pos, 1000)
		}, scr_pause)
	}
	//If native scroll
	//disableScroll();
}
