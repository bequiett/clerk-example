import Courses from '@/components/Courses'
import { Course } from '@/types/course'
import coursesData from '../api/courses/data.json'

export default function CoursesPage() {
	const courses: Course[] = coursesData

    return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Courses</h1>
			<Courses courses={courses} />
		</div>
	)
}
