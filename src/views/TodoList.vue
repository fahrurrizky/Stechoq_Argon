<script>
import { useListStore } from '@/store/list'
import { mapState, mapActions } from 'pinia'
import { d$auth } from '@/store/auth'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
function goDetail(id) {
    if(id)
	router.push({
		path: `/tables/${id}`
	})
}

export default {
    name: "todo-list",
    data() {
        return {
            user: d$auth().g$user,
        };
    },
    computed: {
        // import all defined getters via mapState helper
        ...mapState(useListStore, ["getList", "getDetail"])
    },
    async mounted() {
        await this.a$list();
    },
    methods: {
        // import all defined actions via mapActions helper
        ...mapActions(useListStore, [
            "a$list",
            "a$add",
            "editIndex",
            "removeIndex"
        ]),
    },
    components: { RouterLink }
};
</script>

<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between align-items-center">
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
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Author
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Title
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Description
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Completed
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody>
            <!-- Use v-for to loop through items -->
            <tr v-for="item in getList" :key="item.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <!-- Use v-if to check if user has an image -->
                    <img v-if="user.image" :src="user.image" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
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
                <span class="text-secondary text-xs font-weight-bold">{{ item?.description }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="badge badge-sm bg-gradient-success">{{ item?.completed ? "Done" : "Not Done" }}</span>
              </td>
              <td class="text-center align-middle">
                <router-link to="/todo-edit">
                    <a class="text-primary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a>
                </router-link>
                <span class="mx-1"> </span>
                    <a class="text-danger font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">Delete</a>
                <span class="mx-1"> </span>
                <router-link to="/todo-detail">
                    <a class="text-success font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">Detail</a>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
