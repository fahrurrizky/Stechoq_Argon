<template>
  <div class="form-group">
    <label :for="exampleFormControlTextarea1">
      <slot />
    </label>
    <textarea
			@input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
      rows="5"
      :placeholder="placeholder"
      :id="exampleFormControlTextarea1"
    ></textarea>
  </div>
</template>

<script>
export default {
	name: 'argon-textarea',
	props: {
		id: String,
		placeholder: String,
		modelValue: String
	},
	emits: ['update:modelValue']
}
</script>