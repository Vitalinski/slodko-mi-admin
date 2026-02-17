<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 bg-[#ffffff]">
    <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr
          class="items-center"
          style="
            display: grid;
            grid-template-columns: 232px 100px 100px 100px 100px auto 100px;
          "
        >
          <slot name="head"></slot>
        </tr>
      </thead>

      <slot name="body"></slot>
    </table>
  </div>
</template>
