-- CreateTable
CREATE TABLE "ChildrenOnCourses" (
    "childId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("childId","courseId")
);

-- AddForeignKey
ALTER TABLE "ChildrenOnCourses" ADD FOREIGN KEY ("childId") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenOnCourses" ADD FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
