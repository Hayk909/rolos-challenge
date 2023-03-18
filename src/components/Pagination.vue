<template>
	<div class="page_wrapper">
		<div class="pages">
			<Transition>
				<div
					v-if="currentPage !== 1"
					class="pages__page--item prev"
					@click="$emit('onChange', currentPage - 1)"
				>
					<ArrowLeftIcon />
					<span class="pages__arrow-prev">Previous</span>
				</div>
			</Transition>
			<div class="pages__numbers">
				<div
					v-for="page in visiblePages"
					:key="page"
					:class="['pages__page--item', { 'active': page === currentPage, 'dots': page === dots }]"
					@click="changePage(page)"
				>
					<span v-html="page" />
				</div>
			</div>
			<Transition>
				<ArrowRightIcon
					v-if="currentPage !== pagesLength && visiblePages.length"
					class="pages__page--item next"
					@click.native="$emit('onChange', currentPage + 1)"
				/>
			</Transition>
		</div>
		<select v-model="perPage" class="page_count" @change="$emit('onPerPage', $event)">
			<option v-for="count in perPageOptions" :key="count" :value="count">
				{{ count }}
			</option>
		</select>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import ArrowLeftIcon from '@/assets/icons/arrow-left.vue';
import ArrowRightIcon from '@/assets/icons/arrow-right.vue';

interface PaginationProps {
  total?: number,
	limit?: number,
	page?: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
	total: 0,
	limit: 0,
	page: 0
})

const emits = defineEmits(['onChange'])

const visibleClickStep = 2
const defaultAllowsVisiblePages = 8
const dots = '&#8230'

const visiblePages = computed(() => {
	const allPagesArray = Array.from({length: pagesLength.value}, (_, i) => i + 1)

	if (allPagesArray.length <= defaultAllowsVisiblePages)
		return allPagesArray

	const end = allPagesArray.slice(allPagesArray.length - visibleClickStep)

	// -1 for index
	if (currentPage.value < defaultAllowsVisiblePages - 1) {
		const start = allPagesArray.slice(0, currentPage.value + visibleClickStep)

		return [...start, dots, ...end]
	} else {
		const start = allPagesArray.slice(0, visibleClickStep)
		
		// -1 for index
		const middle = allPagesArray.slice(currentPage.value - visibleClickStep - 1, currentPage.value + visibleClickStep)

		if (end.includes(currentPage.value))
			return [...start, dots, ...middle]

		if (end.includes(currentPage.value + visibleClickStep)) {
			const result = [...start, dots, ...middle]

			if (currentPage.value + visibleClickStep === end[0]) result.push(end[1])

			return result
		}

		if (middle[middle.length - 1] + visibleClickStep === end[end.length - 1])
			return [...start, dots, ...middle, ...end]

		return [...start, dots, ...middle, dots, ...end]
	}
})

const pagesLength = computed(() => {
	return Math.ceil(props.total / props.limit)
})

const currentPage = computed(() => {
	return !props.page ? 1 : (props.page / props.limit) + 1
})

const changePage = (page: number | string) => {
	if (page !== dots)
		emits('onChange', page)
}

const perPage = ref(props.limit)
const perPageOptions = [5, 10, 20, 30, 50, 100] 
</script>
