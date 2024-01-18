import React, { useState } from "react";
import { useGetEntriesQuery } from "database/services";
import { nolotusId } from "core/init";
import {
	format,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	isSameDay,
} from "date-fns";
import clsx from "clsx";

const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());

	const {
		data: events,
		error,
		isLoading,
		isSuccess,
	} = useGetEntriesQuery({
		userId: nolotusId,
		options: {
			isJSON: true,
			condition: {
				end_time: { exists: true }, // end_time键必须存在
				is_template: { equals: false }, // is_template键的值必须等于false
			},
			limit: 10000,
		},
	});

	const daysOfWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

	// 获取当前月份的第一天和最后一天周视图的日期
	const daysInMonth = () => {
		const startDay = startOfWeek(startOfMonth(currentMonth), {
			weekStartsOn: 1,
		});
		const endDay = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
		return eachDayOfInterval({ start: startDay, end: endDay });
	};

	const days = daysInMonth();

	// 显示加载状态或错误
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="bg-white p-4">
			<div className="grid grid-cols-7 gap-4">
				{daysOfWeek.map((day) => (
					<div key={day} className="text-center font-semibold">
						{day}
					</div>
				))}
				{days.map((day, index) => (
					<div
						key={index}
						className={clsx("text-center p-2", {
							"bg-blue-100": format(day, "MMM") === format(currentMonth, "MMM"), // 当月日期使用高亮样式
							"text-gray-500":
								format(day, "MMM") !== format(currentMonth, "MMM"), // 非当月日期使用灰色样式
						})}
					>
						{format(day, "d")}
						<div className="event-list">
							{isSuccess &&
								events
									.filter((event) => isSameDay(new Date(event.start_time), day))
									.map((event) => (
										<div
											key={event.id}
											className="p-1 rounded bg-blue-300 text-white"
										>
											{/* 展示事件详情 */}
											{event.title}
										</div>
									))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
