<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonTextarea from "@/components/ArgonTextarea.vue";
import { useTodoStore } from "@/store/todo";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      item: {
        id: 0,
      },
      input: {
        title: "",
        description: "",
        completed: false,
      },
      todoId: null,
    };
  },
  components: { ArgonButton, ArgonInput, ArgonTextarea },
  computed: {
    ...mapState(useTodoStore, ["getDetailTodo"]),
  },
  methods: {
    ...mapActions(useTodoStore, ["initDetail", "editTodo"]),
    async submitForm() {
      try {
        await this.editTodo(this.getDetailTodo.id, {
          title: this.input.title,
          description: this.input.description,
          completed: this.input.completed,
        });
        this.$router.push({ name: "Profile" });
      } catch (error) {
        alert("An error occurred while updating the todo: " + error.message);
      }
    },
  },
  async mounted() {
    await this.initDetail(this.$route.params.id);
    this.input = this.getDetailTodo;
  },
};
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-12 d-flex justify-content-center">
        <div
          v-if="input?.id !== undefined"
          class="card mb-4 p-4"
          style="width: 500px"
        >
          <form role="form" @submit.prevent="() => submitForm()">
            <div class="mb-3">
              <div class="form-group">
                <argon-input
                  placeholder="title"
                  name="title"
                  v-model="input.title"
                  size="lg"
                />
              </div>
            </div>
            <div class="mb-3">
              <div class="form-group">
                <argon-textarea
                  placeholder="description"
                  name="description"
                  v-model="input.description"
                  size="lg"
                />
              </div>
            </div>
            <div class="mb-3">
              <div class="form-group d-flex align-items-center">
                <input
                  class=""
                  type="checkbox"
                  v-model="input.completed"
                  id="completed"
                  name="completed"
                />
                <label class="mt-2 ms-2" for="completed">Completed</label>
              </div>
            </div>
            <div class="text-center">
              <argon-button
                class="mt-4"
                variant="gradient"
                color="success"
                fullWidth
                size="lg"
                >update</argon-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
