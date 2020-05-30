<script>
export default {};
</script>

<template>
  <div class="box is-info">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<style>
.box {
  background: #e3e3e3;
  padding: 10px;
  border: 1px solid #c5c5c5;
}
</style>
