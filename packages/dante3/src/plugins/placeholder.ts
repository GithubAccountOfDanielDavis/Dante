import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export default new Plugin({
  props: {
    decorations: (state) => {
      const decorations: Decoration[] = [];

      const decorate = (node: typeof state.doc, pos: number) => {
        if (node.type.isBlock && node.childCount === 0) {
          decorations.push(
            Decoration.node(pos, pos + node.nodeSize, {
              class: "empty-node",
            })
          );
        }
      };

      state.doc.descendants(decorate);

      return DecorationSet.create(state.doc, decorations);
    },
  },
});
