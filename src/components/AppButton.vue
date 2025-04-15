<template>
    <button
      :class="['app-button', buttonClass, { active: isActive }, variant]"
      :disabled="disabled"
      @click="handleClick"
    >
      <slot>{{ label }}</slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'AppButton',
    props: {
      label: {
        type: String,
        default: '', 
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      buttonClass: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
      variant: {
        type: String,
        default: 'primary',
      }
    },
    methods: {
      handleClick(event) {
        if (!this.disabled) {
          this.$emit('click', event);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .app-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  /* Primary style */
  .primary {
    background-color: #178edd;
    color: white;
  }
  
  /* Secondary style */
  .secondary {
    background-color: #5e6363;
    color: white;
  }
  
  /* Hover state */
  .app-button:hover {
    transform: scale(1.05);
  }
  
  /* Disabled state styling */
  .app-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Active state styling */
.active {
  background-color: #1abc9c;  /* A contrasting, vibrant color */
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(26, 188, 156, 0.8);
}
  </style>
  