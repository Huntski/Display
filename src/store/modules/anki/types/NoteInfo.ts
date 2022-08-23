export default interface NoteInfo {
    noteId: string,
    modelName: string,
    tags: string,
    /*
        The fields are based on the noteType itself,
        so I need to figure this out later.
     */
    fields: any,
}
