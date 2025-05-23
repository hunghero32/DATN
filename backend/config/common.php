<?php
return [
    'statuses' => [
        '1' => [
            'text' => 'Đã phê duyệt',
            'class' => 'badge bg-success'
        ],
        '0' => [
            'text' => 'Chưa phê duyệt',
            'class' => 'badge bg-danger'
        ],
    ],
    'order_statuses' => [
        'pending' => [
            'text' => 'Đang chờ',
            'class' => 'badge bg-warning'
        ],
        'confirmed' => [
            'text' => 'Đã xác nhận',
            'class' => 'badge bg-info'
        ],
        'examining' => [
            'text' => 'Đang khám',
            'class' => 'badge bg-primary'
        ],
        'completed' => [
            'text' => 'Hoàn thành',
            'class' => 'badge bg-success'
        ],
        'canceled' => [
            'text' => 'Đã hủy',
            'class' => 'badge bg-danger'
        ]
    ]
];
