<script>
import { useTodoStore } from "@/store/todo";
import { mapState, mapActions } from "pinia";
import { d$auth } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

export default {
  data() {
    return {
      user: d$auth().g$user,
      todoId: null,
    };
  },

  computed: {
    ...mapState(useTodoStore, ["getDetailTodo"]), 
    item() {
      return this.getDetailTodo(this.todoId); 
    },
  },
  async mounted() {
    this.todoId = this.$route.params.id;
    await this.initDetail(this.todoId);
  },
  async unmounted(){
    this.initDetail()
  },
  methods: {
    ...mapActions(useTodoStore, ["initDetail", "editTodo"]),
    formatDate(isoDate) {
      const date = new Date(isoDate);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("id-ID", options);
    },
    async toggleComplete() {
      const detail = this.getDetailTodo;
      await this.editTodo(this.todoId, {
        ...detail,
        completed: !detail.completed,
      });
      await this.initDetail(this.todoId);
    },
  },
};
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-12 d-flex justify-content-center">
        <div v-if="getDetailTodo" class="card mb-4 p-4" style="width: 100%">
          <div>
            <div>
              <span class="mb-0">
                <span>{{ user.name }} - </span>
              </span>
              <span class="mb-0">
                <span> {{ formatDate (getDetailTodo.createdAt) }} </span>
              </span>
            </div>
            <h3>{{ getDetailTodo.title }}</h3>
          </div>

          <div class="mt-4">
            <h4>Deskription:</h4>
            <p>{{ getDetailTodo.description }}</p>
          </div>

          <div>
            <h4>Completion</h4>
            <p class="d-flex justify-content-between align-items-center">
              <span>
                {{ getDetailTodo.completed }}
              </span>
              <button
                @click="toggleComplete"
                type="button"
                class="btn mx-3 text-white"
                :class="getDetailTodo?.completed ? 'bg-warning' : 'bg-success'"
              >
                {{ getDetailTodo?.completed ? "mark as undone" : "mark as done" }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
