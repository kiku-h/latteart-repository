import { NoteEntity } from "@/entities/NoteEntity";
import { SessionEntity } from "@/entities/SessionEntity";
import { StoryEntity } from "@/entities/StoryEntity";
import { Session } from "@/interfaces/Sessions";
import { Story } from "@/interfaces/Stories";

type issue = {
  details: string;
  source: {
    index: number;
    type: string;
  };
  status: string;
  ticketId: string;
  type: string;
  value: string;
  imageFilePath?: string;
};

export const storyEntityToResponse = (story: StoryEntity): Story => {
  return {
    id: story.id,
    index: story.index,
    testMatrixId: story.testMatrixId,
    testTargetId: story.testTargetId,
    viewPointId: story.viewPointId,
    status: story.status,
    sessions: story.sessions.map((session) => {
      return sessionEntityToResponse(session);
    }),
  };
};

const noteEntityToResponse = (note: NoteEntity): issue => {
  const testStep = note.testSteps ? note.testSteps[0] : undefined;
  return {
    details: note.details,
    source: {
      index: 0,
      type: "notice",
    },
    status: note.tags?.find((tag) => {
      return tag.name === "reported";
    })
      ? "reported"
      : note.tags?.find((tag) => {
          return tag.name === "invalid";
        })
      ? "invalid"
      : "",
    ticketId: "",
    type: "notice",
    value: note.value,
    imageFilePath:
      note.screenshot?.fileUrl ?? testStep?.screenshot?.fileUrl ?? "",
  };
};

export const sessionEntityToResponse = (session: SessionEntity): Session => {
  return {
    index: session.index,
    id: session.id,
    attachedFiles:
      session.attachedFiles
        ?.sort((a, b) => {
          return (a.createdDate as Date).toLocaleString() >
            (b.createdDate as Date).toLocaleString()
            ? 1
            : -1;
        })
        .map((attachedFile) => {
          return {
            name: attachedFile.name,
            fileUrl: attachedFile.fileUrl,
          };
        }) ?? [],
    doneDate: session.doneDate,
    isDone: !!session.doneDate,
    issues:
      session.testResult?.notes?.map((note) => {
        return noteEntityToResponse(note);
      }) ?? [],
    memo: session.memo,
    name: session.name,
    testItem: session.testItem,
    testResultFiles: session.testResult
      ? [
          {
            name: session.testResult?.name ?? "",
            id: session.testResult?.id ?? "",
          },
        ]
      : [],
    testerName: session.testUser,
    testingTime: session.testingTime,
  };
};
