export const commentConfig = [] || [
  {
    id: 1,
    name: "meheta",
    comment: "This is a comment",
    creationTime: new Date().toLocaleString(),
    modifiedTime: new Date().toLocaleString(),
    isEditing: true,
    child: [
      {
        id: 2,
        name: "meheta -> sarthak",
        comment: "This is a comment",
        creationTime: new Date().toLocaleString(),
        modifiedTime: new Date().toLocaleString(),
        isEditing: true,
        child: [
          {
            id: 3,
            name: "meheta -> sarthak -> punam",
            comment: "This is a comment",
            creationTime: new Date().toLocaleString(),
            modifiedTime: new Date().toLocaleString(),
            isEditing: true,
            child: [
              {
                id: 4,
                name: "meheta -> sarthak -> punam -> neha",
                comment: "This is a comment",
                creationTime: new Date().toLocaleString(),
                modifiedTime: new Date().toLocaleString(),
                isEditing: true,
                child: [
                  {
                    id: 3,
                    name: "meheta -> sarthak -> roshni",
                    comment: "This is a comment",
                    creationTime: new Date().toLocaleString(),
                    modifiedTime: new Date().toLocaleString(),
                    isEditing: false,
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: "meheta -> sarthak -> roshni",
            comment: "This is a comment",
            creationTime: new Date().toLocaleString(),
            modifiedTime: new Date().toLocaleString(),
            isEditing: false,
          },
        ],
      },
      {
        id: 5,
        name: "meheta -> avish",
        comment: "This is a comment",
        creationTime: new Date().toLocaleString(),
        modifiedTime: new Date().toLocaleString(),
        isEditing: false,
      },
    ],
  },
];

export const COMMENT_STATUS = {
  REPLY: "Reply",
  EDIT: "Edit",
};

export const SORT_TEXT = `Sort By: Date and Time`;
