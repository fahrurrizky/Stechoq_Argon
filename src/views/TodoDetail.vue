<template>
	<div class="py-4 container-fluid">
		<div class="mt-4 row">
			<div class="col-12 d-flex justify-content-center">
				<div class="card mb-4 p-4" style="width: 100%">
					<div>
						<h3>{{ todo?.title ?? 'title' }}</h3>

						<div>
							<p class="mb-0">
								created by: <span>{{ todo.username }}</span>
							</p>
							<p class="mb-0">
								created at: <span> {{ formatDateString(todo.createdAt) }} </span>
							</p>
						</div>
					</div>

					<div class="mt-4">
						<h4>Deskription:</h4>
						<p>{{ todo?.description ?? 'description' }}</p>
					</div>

					<div>
						<h4>Completion</h4>
						<p class="d-flex justify-content-between align-items-center">
							<span>
								{{ (todo?.completed ? 'DONE' : 'NEED TO DO') ?? 'completion' }}
							</span>
							<button
								@click="toggleComplete"
								type="button"
								class="btn mx-3 text-white"
								:class="todo?.completed ? 'bg-warning' : 'bg-success'">
								{{ todo?.completed ? 'mark as undone' : 'mark as done' }}
							</button>
						</p>
					</div>

					<div class="mt-4">
						<button @click="back" type="button" class="btn btn-dark me-3">Go to Table</button>
						<button @click="goEdit" type="button" class="btn btn-success me-3">Edit</button>
						<button @click="removeTodo" type="button" class="btn btn-danger">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatDateString } from '@/utils/formatDate'

import * as s$todo from '@/services/todo'
import { useTodoStore } from '@/store/todo'

const store = useTodoStore()

const route = useRoute()
const router = useRouter()
const id = route.params.id

const todo = ref({})

const init = async () => {
	try {
		const { data } = await s$todo.detail(id)
		todo.value = data
	} catch (error) {
		throw error
	}
}

onMounted(init)

async function toggleComplete() {
	const detail = store.getDetail(id)

	await store.editTodo(id, {
		// pass all entries in detail object
		...detail.value,
		// take completed value then toggle it
		completed: !detail.value.completed
	})

	init()
}

async function removeTodo() {
	await store.removeTodo(id)
	router.push({
		name: 'Tables'
	})
}

function goEdit() {
	router.push({
		path: `/tables/${id}/edit`
	})
}

function back() {
	router.push({
		name: 'Tables'
	})
}
</script>

<style lang="scss" scoped></style>
