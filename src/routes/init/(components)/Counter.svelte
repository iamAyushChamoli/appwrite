<script lang="ts">
    import { fade } from 'svelte/transition';

    type $$Props = {
        value: number;
    };

    export let value = 0;

    const getTransform = (value: number) => `translateY(-${value * 100}%)`;

    function transform(node: HTMLElement, value: number) {
        function update(value: number) {
            const childNode = [...node.children].find((child) => child.innerHTML === String(value));
            if (!childNode) return;

            const charWidth = childNode.getBoundingClientRect().width;
            node.style.transform = `translateY(-${value * 100}%)`;
            node.style.width = `${charWidth}px`;
        }

        update(value);

        return { update };
    }
</script>

<div class="wrapper">
    {#each value?.toString().padStart(2, '0') as char, index (index)}
        <div transition:fade={{ duration: 200 }}>
            {#if Number.isNaN(Number(char))}
                <span>{char}</span>
            {:else}
                <ul style:transform={getTransform(Number(char))} use:transform={Number(char)}>
                    {#each { length: 10 } as _, i}
                        <li>{i}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    {/each}
</div>

<style>
    .wrapper {
        display: inline-flex;
        overflow: hidden;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: var(--height, 1rem);
        line-height: var(--line-height, 1rem);
        transition: 0.5s ease;
    }
</style>
