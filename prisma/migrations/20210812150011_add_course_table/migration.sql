-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "places" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChildrenToCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChildrenToCourses_AB_unique" ON "_ChildrenToCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_ChildrenToCourses_B_index" ON "_ChildrenToCourses"("B");

-- AddForeignKey
ALTER TABLE "_ChildrenToCourses" ADD FOREIGN KEY ("A") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChildrenToCourses" ADD FOREIGN KEY ("B") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
