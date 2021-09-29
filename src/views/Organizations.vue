<template>
  <div class="section">
    <h1 class="title">Organizations</h1>
    <organizations-nav-bar @itemChanged="modifiedItem" />
    <div>
      <div class="columns containar-fluid is-multiline ">
        <div
          class="column is-one-third"
          v-for="(item, index) in organizationData"
          :key="index"
        >
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ item.orgName }}
              </p>
              <span class="card-header-icon">
                <!-- <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span> -->
                <p>{{ item.id }}</p>
              </span>
            </header>
            <div class="card-content">
              <div class="content">
                <div>{{ item.name }} - {{ item.designation }}</div>
                <div>
                  <a :href="`mailto:${item.emailId}`">{{ item.emailId }}</a>
                </div>
                <div>{{ item.mobileNumber }}</div>
                <hr />
                <div>{{ item.orgName }} - {{ item.location }}</div>
                <div>
                  {{ item.address }}
                </div>
              </div>
            </div>
            <footer v-if="isPending" class="card-footer">
              <div class="column" align="right">
                <b-button
                  type="is-text"
                  class="reject"
                  icon-left="close-circle-outline"
                  @click="action('reject', index)"
                  >Reject</b-button
                >
              </div>
              <div class="column" align="left">
                <b-button
                  type="is-text"
                  class="approve"
                  icon-left="check-circle-outline"
                  @click="action('approve', item.id)"
                  >Approve</b-button
                >
              </div>
            </footer>
          </div>
        </div>
        <b-modal width="50%" :active.sync="isShowUserDetailsActive">
          <div class="card">
            <div class="card-content">
              <p>Username: {{ this.currentUserName }}</p>
              <p>Temporary Password: {{ this.currentPassword }}</p>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrganizationsNavBar from "@/components/OrganizationNavBar";
export default {
  components: { OrganizationsNavBar },
  mounted() {
    this.getOrganizationDetails(0);
  },
  data() {
    return {
      organizationData: null,
      isShowUserDetailsActive: false,
      currentUserName: "",
      currentPassword: "",
      isPending: true,
    };
  },
  methods: {
    modifiedItem(value) {
      if (value === 0) {
        this.isPending = true;
      } else {
        this.isPending = false;
      }
      this.getOrganizationDetails(value);
    },
    action(decision, refId) {
      let here = this;

      axios
        .post(
          `http://34.234.85.115:8080/services/gex/approveRegistration?refId=${refId}&action=${decision}`
        )
        .then(function(response) {
          if (response.data.msg === "Success") {
            here.currentUserName = String(response.data.userName);
            here.currentPassword = String(response.data.password);
            here.isShowUserDetailsActive = true;
            // alert(
            //   "Username: " +
            //     String(response.data.userName) +
            //     "\n" +
            //     "Password: " +
            //     String(response.data.password)
            // );
          } else {
            here.$buefy.snackbar.open({
              type: "is-danger",
              message: response.data.error,
              queue: false,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          here.$buefy.snackbar.open({
            type: "is-danger",
            message: "Failed. Please retry",
            queue: false,
          });
        });
    },
    getOrganizationDetails(status) {
      let here = this;
      var data_filter = null;
      axios
        .get("http://34.234.85.115:8080/services/gex/getRegistrationReq")
        .then(function(response) {
          if (status === 0) {
            data_filter = response.data.filter(
              (element) => element.status == "Pending"
            );
            here.organizationData = data_filter;
          } else if (status === 1) {
            data_filter = response.data.filter(
              (element) => element.status == "Approved"
            );
            here.organizationData = data_filter;
          } else if (status === 2) {
            data_filter = response.data.filter(
              (element) => element.status == "Rejected"
            );
            here.organizationData = data_filter;
          }
        })
        .catch(function(error) {
          console.log(error);
          here.$buefy.snackbar.open({
            type: "is-danger",
            message: "Failed. Please retry",
            queue: false,
          });
        });
    },
  },
};
</script>

<style scoped>
.containar-fluid {
  margin-left: 4rem;
  margin-right: 4rem;
}
.reject:hover {
  color: red !important;
}
.approve:hover {
  color: #03b072 !important;
}
.card {
  border-radius: 0.5rem;
}
</style>
