<template>
  <q-form
    ref="login"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
  >
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
      data-cy="login__email"
    />
    <Input
      name="password"
      v-model="user.password"
      @keypress.enter="submit"
      :type="passwordVisible ? 'text' : 'password'"
      label="Password"
      :rules="[(val) => validations.required(val, 'Password')]"
      class="q-pt-md"
      data-cy="login__password"
    >
      <template v-slot:append>
        <q-icon
          @click="passwordVisible = !passwordVisible"
          :name="passwordVisible ? icons.visibilityOff : icons.visibility"
          class="cursor-pointer"
          data-cy="login__password_visibility"
        />
      </template>
    </Input>
    <div class="q-pt-lg row justify-between">
      <div class="col-6">
        <div class="row">
          <router-link
            :to="{ name: 'Register' }"
            class="col-12 cursor-pointer text-primary"
            data-cy="login__register_redirect"
          >
            <span>Don't have an account?</span>
          </router-link>
          <router-link
            :to="{ name: 'ForgotPassword' }"
            class="col-12 cursor-pointer text-primary"
            data-cy="login__forgot_password_redirect"
          >
            <span>Forgot password?</span>
          </router-link>
        </div>
      </div>
      <div class="col-6 text-right">
        <Button
          @click="submit"
          :loading="isLoading"
          label="Log in"
          data-cy="login__button"
        />
      </div>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { matVisibility, matVisibilityOff } from '@quasar/extras/material-icons';
import { validateRequired, validateEmail } from 'src/services/utils';

export default {
  name: 'Login',
  data: () => ({
    icons: { visibility: undefined, visibilityOff: undefined },
    user: { email: undefined, password: undefined },
    passwordVisible: false,
  }),
  computed: {
    ...mapState({ isLoading: (state) => state.auth.isLoading }),
    validations() {
      return {
        required: validateRequired,
        email: validateEmail,
      };
    },
  },
  methods: {
    ...mapActions({ login: 'auth/login' }),
    submit() {
      this.$refs.login.validate().then((success) => {
        if (success) this.login(this.user);
      });
    },
  },
  created() {
    this.icons.visibility = matVisibility;
    this.icons.visibilityOff = matVisibilityOff;
  },
};
</script>
