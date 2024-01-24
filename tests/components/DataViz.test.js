import { cleanup, render, screen, within } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import DataViz from "../../src/lib/DataViz.svelte";

import { datasets } from "../mocks/mockVarsDataView";

describe('Load and display data viz component', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component', () => {
        const container = render(DataViz);
        expect(container).toBeTruthy();
    });
})