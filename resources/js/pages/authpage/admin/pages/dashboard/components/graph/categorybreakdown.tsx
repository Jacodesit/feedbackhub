import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function CategoryBreakdown() {

    const options: ChartOptions<'bar'> = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Feedback Distribution by Category',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    const data: ChartData<'bar'> = {
        labels: ['Feature Requests', 'Bug Reports', 'UI/UX', 'Performance', 'Other'],
        datasets: [
            {
                label: 'Total Tickets',
                data: [45, 18, 27, 9, 12],
                backgroundColor: [
                    'rgba(147, 51, 234, 0.6)',  // Purple (Feature Requests)
                    'rgba(239, 68, 68, 0.6)',   // Red (Bug Reports)
                    'rgba(59, 130, 246, 0.6)',  // Blue (UI/UX)
                    'rgba(249, 115, 22, 0.6)',  // Orange (Performance)
                    'rgba(107, 114, 128, 0.6)', // Gray (Other)
                ],
                borderColor: [
                    'rgb(147, 51, 234)',
                    'rgb(239, 68, 68)',
                    'rgb(59, 130, 246)',
                    'rgb(249, 115, 22)',
                    'rgb(107, 114, 128)',
                ],
                borderWidth: 1,
            }
        ],
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow-md h-[500px] w-full min-w-0 overflow-hidden">
            <Bar options={options} data={data} />
        </section>
    );
}
