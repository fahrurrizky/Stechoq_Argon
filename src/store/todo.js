import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import * as s$todo from '@/services/todo'

export const useTodoStore = defineStore('todo', () => {
	// initial state
	const todo = ref([])
	const detailTodo = ref({})

	// getter
	const getTodo = computed(() => todo.value)
	const getDetailTodo = computed(() => detailTodo.value)
	const getDetail = (id) => computed(() => todo.value.find((el) => el.id == id))

	// action
	const init = async () => {
		try {
			const { data } = await s$todo.list()
			todo.value = data
		} catch (error) {
			throw error
		}
	}

	const initDetail = async (id) => {
		try {
			if (!id) return detailTodo.value={}
			const { data } = await s$todo.detail(id)
			detailTodo.value = data
		} catch (error) {
			throw error
		}
	}

	const addTodo = async (body) => {
		try {
			await s$todo.add(body)
			await init()
		} catch ({ message, error }) {
			throw message ?? error
		}
	}

	const removeTodo = async (id) => {
		try {
			await s$todo.remove(id)
			await init()
		} catch ({ message, error }) {
			throw message ?? error
		}
	}
	const editTodo = async (id, data) => {
		try {
			await s$todo.edit(id, data)
			await init()
		} catch ({ message, error }) {
			throw message ?? error
		}
	}

	return { getTodo, init, getDetail, addTodo, removeTodo, editTodo, getDetailTodo, initDetail }
})
