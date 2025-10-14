import Link from 'next/link'
import { Course } from '@/types/course'

interface CoursesProps {
	courses: Course[]
}

export default function Courses({ courses }: CoursesProps) {
	return (
		<div className="grid-1">
			{courses.map((course: Course) => (
				<div key={course.id} className="bg-blue-200 dark:bg-blue-900 p-4 m-4 rounded-lg">
					<h2 className="text-lg text-gray-900 dark:text-gray-100">{course.title}</h2>
					<small className="text-gray-700 dark:text-gray-300">Level: {course.level}</small>
					<p className="mb-4 text-gray-800 dark:text-gray-200">{course.description}</p>
					<Link
						href={course.link}
						target="_blank"
						className="py-2 px-4 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg mb-4"
					>
						Go To Course
					</Link>
				</div>
			))}
		</div>
	)
}
