<script>
import { useTodoStore } from "@/store/todo";
import { mapState, mapActions } from "pinia";
import { d$auth } from "@/store/auth";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

export default {
  name: "todo-list",
  data() {
    return {
      user: d$auth().g$user,
      currentItem: null,
      isDeleted: false,
    };
  },
  computed: {
    ...mapState(useTodoStore, ["getTodo", "getDetail"]),
  },
  async mounted() {
    await this.init();
  },
  methods: {
    ...mapActions(useTodoStore, ["init", "removeTodo"]),
    confirmDelete(item) {
      this.currentItem = item;
      this.isDeleted = true;
    },
    deleteItem() {
      if (this.currentItem) {
        this.removeTodo(this.currentItem.id);
        this.isDeleted = false;
      }
    },
    goDetail(id) {
      if (id) {
        this.$router.push({
          path: `/todo-detail/${id}`,
        });
      }
    },
  },
  components: { RouterLink },
};
</script>

<template>
  <div class="card">
    <div
      class="card-header pb-0 d-flex justify-content-between align-items-center"
    >
      <h6>List Todo</h6>
      <router-link to="/todo-create">
        <button type="button" class="btn btn-success">Create Todo</button>
      </router-link>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <!-- Table Head -->
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Author
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Title
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Description
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Completed
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody>
            <!-- Use v-for to loop through items -->
            <tr v-for="item in getTodo" :key="item.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <!-- Access item.title instead of undefined item -->
                <p class="text-xs font-weight-bold mb-0">{{ item.title }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <!-- Access item.description instead of undefined item -->
                <span class="text-secondary text-xs font-weight-bold">{{
                  item?.description
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="badge badge-sm bg-gradient-success">{{
                  item?.completed ? "Done" : "Not Done"
                }}</span>
              </td>
              <td class="text-center">
                <router-link :to="{ name: 'Todo Edit', params: { id: item.id}}">
                  <button
                    type="button"
                    class="btn btn-link text-primary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit
                  </button>
                </router-link>
                <button
                  type="button"
                  class="btn btn-link text-danger font-weight-bold text-xs"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  data-original-title="Delete user"
                  @click="confirmDelete(item)"
                >
                  Delete
                </button>
                <button
                  @click="() => goDetail(item.id)"
                  type="button"
                  class="btn btn-link text-success font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Delete user"
                >
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div class="modal" id="deleteModal" tabindex="-1" role="dialog">
    <div
      class="modal-dialog position-absolute top-50 start-50 translate-middle"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Deletion</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="button" data-bs-dismiss="modal" class="btn btn-danger" @click="deleteItem">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
