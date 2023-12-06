<script setup>
import ArgonInput from '@/components/ArgonInput.vue'
import ArgonButton from '@/components/ArgonButton.vue'
import ArgonTextarea from '@/components/ArgonTextarea.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/store/todo'

const router = useRouter()
const todo = useTodoStore()

const initialInput = {
	title: '',
	category: '',
	description: '',
	completed: false
}

const input = ref({ ...initialInput })
// const editing = ref(false)

const resetForm = () => {
	Object.assign(input.value, initialInput)
	// editing.value = false
}

const submitForm = async () => {
	try {
		await todo.addTodo(input.value)
		router.push({
			name: 'Profile'
		})
	} catch (error) {
		alert(error)
	}
	resetForm()
}
</script>

<template>
	<div class="py-4 container-fluid">
		<div class="mt-4 row">
			<div class="col-12 d-flex justify-content-center">
				<div class="card mb-4 p-4" style="width: 500px">
					<form role="form" @submit.prevent="submitForm()">
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
								<argon-input
									isRequired
									type="text"
									placeholder="Category"
									name="category"
									v-model="input.category"
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
						<div class="text-center">
							<argon-button type="submit" class="mt-4" variant="gradient" color="success" fullWidth size="lg"
								>Create</argon-button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
