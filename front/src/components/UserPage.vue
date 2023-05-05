<template>

    <div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Edit Profile">
          <edit-profile></edit-profile>
        </el-tab-pane>
        <el-tab-pane label="Change Password">
          <change-password></change-password>
        </el-tab-pane>
        <el-tab-pane label="Manage List">
          <manage-list></manage-list>
        </el-tab-pane>
        <el-tab-pane label="View Comments">
          <view-comments></view-comments>
        </el-tab-pane>
      </el-tabs>
    </div>

</template>

<script>

import EditProfile from "./UserPageComoponents/EditProfile";
import ChangePassword from "./UserPageComoponents/ChangePassword";
import ManageList from "./UserPageComoponents/ManageList";
import ViewComments from "./UserPageComoponents/ViewComments";

export default {
  name: "UserPage",
  components: {
    EditProfile,
    ChangePassword,
    ManageList,
    ViewComments,
  },

  data() {
    return {
      activeTab: "Edit Profile",
    };
  },

}

</script>

<style scoped>

</style>
