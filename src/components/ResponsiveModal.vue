<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-btn @click="showDialog = true" color="primary"> Open Modal </v-btn>
      <v-dialog
        v-model="showDialog"
        :hide-overlay="true"
        :max-height="maxDialogHeight"
        width="65%"
        content-class="rounded-xxl margin-dialog"
      >
        <v-card>
          <v-toolbar dark color="white" elevation="0" class="ma-4">
            <v-btn icon class="icon-btn" @click="closeDialog">
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title class="black--text">
              <div class="text-subtitle-1 font-weight-medium mb-n1">
                Return items
              </div>
              <div class="text-h6 font-weight-bold">Select customer</div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon class="close-icon-btn" @click="closeDialog">
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="d-flex align-center justify-space-between">
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details
              background-color="grey lighten-4"
              class="rounded-xxl flex-grow-0"
              style="width: 40%"
            >
              <template v-slot:label>
                <span class="font-weight-medium">Search for ID or name</span>
              </template>
            </v-text-field>
            <div class="total-records ml-4">
              {{ filteredCustomers.length }} of {{ customers.length }}
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-list two-line class="ml-2 mr-2">
            <template v-if="!loading">
              <div
                v-for="(customer, index) in filteredCustomers"
                :key="customer.datasource_id"
              >
                <v-list-item>
                  <div class="position-relative avatar flex-grow-0 flex-shrink-0">
                    <span class="white--text text-inline font-weight-bold">{{
                      customer.initials
                    }}</span>
                    <div class="tick-avatar">
                      <v-icon color="white" size="small">mdi-check</v-icon>
                    </div>
                  </div>
                  <v-list-item-content class="flex-grow-1">
                    <v-list-item-title class="d-flex">
                      <div class="customer-id mr-2">
                        {{ customer.id }}
                      </div>
                      <div class="customer-name text-truncate">
                        {{ customer.name }}
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle class="customer-description">
                      {{ customer.description }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="d-flex align-center mr-16">
                    <span class="mr-4 customer-location text-truncate">{{
                      customer.location
                    }}</span>
                  </v-list-item-action>
                  <div
                    text
                    class="ml-6 action-btn flex-grow-0 flex-shrink-0"
                    @click="startReturn(customer)"
                  >
                    Start return
                    <v-icon class="icon-color" right>mdi-arrow-right</v-icon>
                  </div>
                </v-list-item>
                <v-divider
                  v-if="index < filteredCustomers.length - 1"
                ></v-divider>
              </div>
            </template>
            <v-skeleton-loader
              v-else
              type="list-item-three-line"
              :loading="loading"
              class="my-4"
            ></v-skeleton-loader>
          </v-list>
          <v-alert v-if="error" type="error" dismissible class="ma-4">
            {{ error }}
          </v-alert>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { customerService } from "@/services/api";

export default {
  name: "ResponsiveModal",

  data() {
    return {
      showDialog: false,
      searchQuery: "",
      customers: [],
      loading: false,
      error: null,
    };
  },

  computed: {
    filteredCustomers() {
      const query = this.searchQuery.toLowerCase();
      return this.customers
        .map((customer) => ({
          id: customer.datasource_id,
          name: customer.name,
          description: customer.name_2,
          location: customer.store_locations?.[0]?.city || "No location",
          initials: this.getInitials(customer.name),
          status: customer.status,
        }))
        .filter(
          (customer) =>
            customer.id.toLowerCase().includes(query) ||
            customer.name.toLowerCase().includes(query)
        );
    },

    maxDialogHeight() {
      return window.innerHeight - 64;
    },
  },

  methods: {
    getInitials(name) {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },

    async fetchCustomers() {
      this.loading = true;
      this.error = null;

      try {
        const customers = await customerService.getCustomers();
        this.customers = customers;
      } catch (error) {
        this.error = "Failed to load customers. Please try again.";
        console.error("Error:", error);
      } finally {
        this.loading = false;
      }
    },

    closeDialog() {
      this.showDialog = false;
    },

    startReturn(customer) {
      this.$emit("select-customer", customer);
      this.closeDialog();
    },
  },

  created() {
    this.fetchCustomers();
  },
};
</script>

<style scoped>
.margin-dialog {
  margin: 32px 0 !important;
}

.margin-dialog .v-card {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}

.icon-btn {
  border: 1px solid #f0f0f0;
}

.close-icon-btn {
  background-color: #f0f0f0;
}

.total-records {
  color: black;
  font-weight: 600;
}

.avatar {
  background: linear-gradient(180deg, #00fdbe, #00c3ff5e);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  border-radius: 10px;
  width: 40px;
  height: 40px;
}

.tick-avatar {
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #2dc579;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border: 1px solid white;
}

.customer-id {
  font-size: 10px;
  background-color: #f3f2f2;
  border-radius: 20px;
  padding: 3px 5px;
  font-weight: 600;
}

.customer-name {
  font-size: 14px;
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
}

.customer-description {
  font-size: 14px;
  font-weight: 500;
  color: black !important;
}

.customer-location {
  font-size: 14px;
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-btn {
  text-transform: none;
  color: #2a46ff;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  background-color: #f3f2f2;
  border-radius: 20px;
  cursor: pointer;
}

.icon-color {
  color: #2a46ff;
}

.theme--light.v-divider {
  border-color: #f3f2f2 !important;
}

.position-relative {
  position: relative;
}
</style>
