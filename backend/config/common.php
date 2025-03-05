<?php
return [
    'statuses' => [
        'pending' => [
            'text' => 'Chờ xác nhận',
            'class' => 'badge bg-warning'
        ],
        'confirmed' => [
            'text' => 'Đã xác nhận',
            'class' => 'badge bg-primary'
        ],
        'completed' => [
            'text' => 'Hoàn thành',
            'class' => 'badge bg-success'
        ],
        'canceled' => [
            'text' => 'Đã hủy',
            'class' => 'badge bg-danger'
        ],
        0 => [
            'text' => 'Chưa kích hoạt',
            'class' => 'badge bg-danger'
        ],
        1 => [
            'text' => 'Đã kích hoạt',
            'class' => 'badge bg-success'
        ],
        2 => [
            'text' => 'Pending',
            'class' => 'badge bg-secondary'
        ],
        'default' => [
            'text' => 'Không xác định',
            'class' => 'badge bg-dark'
        ]
    ]
];
