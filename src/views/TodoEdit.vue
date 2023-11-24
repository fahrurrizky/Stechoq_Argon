<template>
	<div class="py-4 container-fluid">
		<div class="mt-4 row">
			<div class="col-12 d-flex justify-content-center">
				<div class="card mb-4 p-4" style="width: 500px">
					<form role="form" @submit.prevent="() => submitForm()">
						<div class="mb-3">
							<div class="form-group">
								<argon-input
									isRequired
									type="text"
									placeholder="Title"
									name="title"
									v-model="input.title"
									size="lg" />
							</div>
						</div>
						<div class="mb-3">
							<div class="form-group">
								<argon-textarea
									required
									placeholder="Description"
									name="description"
									v-model="input.description"
									size="lg" />
							</div>
						</div>
						<div class="mb-3">
							<div class="form-group d-flex align-items-center">
								<input
									class=""
									type="checkbox"
									v-model="input.completed"
									id="completed"
									name="completed" />
								<label class="mt-2 ms-2" for="completed">Completed</label>
							</div>
						</div>
						<div class="text-center">
							<argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg"
								>update</argon-button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import ArgonInput from '@/components/ArgonInput.vue'
import ArgonButton from '@/components/ArgonButton.vue'
import ArgonTextarea from '@/components/ArgonTextarea.vue'
// import ArgonCheckbox from '../components/ArgonCheckbox.vue'

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore } from '@/store/todo'

const router = useRouter()
const route = useRoute()

const id = route.params.id
const todo = useTodoStore()
onMounted(async () => await todo.init())

const todoDetail = todo.getDetail(id).value

console.log(todoDetail)

const initialInput = {
	title: todoDetail?.title ?? '',
	description: todoDetail?.description ?? '',
	completed: todoDetail?.completed ?? false
}

const input = ref({ ...initialInput })

const submitForm = async () => {
	try {
		await todo.editTodo(id, input.value)

		router.push({
			path: `/tables/${id}`
		})
	} catch (error) {
		console.log(error)
		alert(error)
	}
}
</script>

<style lang="scss" scoped></style>
