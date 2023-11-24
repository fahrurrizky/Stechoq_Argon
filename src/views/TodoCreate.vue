<template>
	<div class="py-4 container-fluid">
	  <div class="mt-4 row">
		<div class="col-12 d-flex justify-content-center">
		  <div class="card mb-4 p-4" style="width: 500px">
			<form role="form" @submit.prevent="submitForm">
			  <div class="mb-3">
				<div class="form-group">
				  <argon-input
					isRequired
					type="text"
					placeholder="Title"
					name="title"
					v-model="input.title"
					size="lg"
				  />
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
					size="lg"
				  />
				</div>
			  </div>
			  <div class="mb-3">
				<div class="form-group">
				  <argon-textarea
					required
					placeholder="Description"
					name="description"
					v-model="input.description"
					size="lg"
				  />
				</div>
			  </div>
			  <div class="text-center">
				<argon-button
				  class="mt-4"
				  variant="gradient"
				  color="success"
				  fullWidth
				  size="lg"
				  @click="submitForm"
				>
				  Create
				</argon-button>
			  </div>
			</form>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import ArgonInput from '@/components/ArgonInput.vue'
  import ArgonButton from '@/components/ArgonButton.vue'
  import ArgonTextarea from '@/components/ArgonTextarea.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useListStore } from '@/store/list'
  
  export default {
	components: {
	  ArgonInput,
	  ArgonButton,
	  ArgonTextarea,
	},
	setup() {
	  const router = useRouter()
	  const todo = useListStore()
  
	  const initialInput = {
		title: '',
		category: '',
		description: '',
	  }
  
	  const input = ref({ ...initialInput })
  
	  const resetForm = () => Object.assign(input.value, initialInput)
  
	  const submitForm = async () => {
		try {
		  await todo.addTodo(input.value)
  
		  resetForm()
  
		  router.push({
			name: 'Tables',
		  })
		} catch (error) {
		  console.log(error)
		  alert(error)
		}
	  }
  
	  return {
		input,
		submitForm,
	  }
	},
  }
  </script>
  
  <style lang="scss" scoped></style>
  