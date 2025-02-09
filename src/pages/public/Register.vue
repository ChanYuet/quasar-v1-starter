<template>
  <q-form
    ref="register"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
  >
    <Input
      name="name"
      v-model="user.name"
      @keypress.enter="submit"
      label="Name"
      :rules="[(val) => validations.required(val, 'Name')]"
      class="q-pt-md"
      data-cy="register__name"
    />
    <Input
      name="email"
      v-model="user.email"
      @keypress.enter="submit"
      label="Email"
      :rules="[
        (val) => validations.required(val, 'Email'),
        (val) => validations.email(val),
      ]"
      class="q-pt-md"
      data-cy="register__email"
    />
    <Input
      name="password"
      v-model="user.password"
      @keypress.enter="submit"
      :type="passwordVisible ? 'text' : 'password'"
      label="Password"
      :rules="[
        (val) => validations.required(val, 'Password'),
        (val) => validations.password(val),
      ]"
      class="q-pt-md"
      data-cy="register__password"
    >
      <template v-slot:append>
        <q-icon
          @click="passwordVisible = !passwordVisible"
          :name="passwordVisible ? icons.visibilityOff : icons.visibility"
          class="cursor-pointer"
          data-cy="register__password_visibility"
        />
      </template>
    </Input>
    <div class="q-pt-lg row justify-between">
      <div class="col-6">
        <router-link
          :to="{ name: 'Login' }"
          class="cursor-pointer text-primary"
          data-cy="register__login_redirect"
        >
          <span>Have credentials?</span>
        </router-link>
      </div>
      <div class="col-6 text-right">
        <Button
          @click="submit"
          :loading="isLoading"
          label="Register"
          data-cy="register__button"
        />
      </div>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { matVisibility, matVisibilityOff } from '@quasar/extras/material-icons';
import {
  validateRequired,
  validateEmail,
  validatePassword,
} from 'src/services/utils';

export default {
  name: 'Register',
  data: () => ({
    icons: { visibility: undefined, visibilityOff: undefined },
    user: { name: undefined, email: undefined, password: undefined },
    passwordVisible: false,
  }),
  computed: {
    ...mapState({ isLoading: (state) => state.auth.isLoading }),
    validations() {
      return {
        required: validateRequired,
        email: validateEmail,
        password: validatePassword,
      };
    },
  },
  methods: {
    ...mapActions({ register: 'auth/register' }),
    submit() {
      this.$refs.register.validate().then((success) => {
        if (success) this.register(this.user);
      });
    },
  },
  created() {
    this.icons.visibility = matVisibility;
    this.icons.visibilityOff = matVisibilityOff;
  },
};
</script>
