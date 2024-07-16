<!-- ================== BEGIN BASE JS ================== -->
<script src="/assets/js/app.min.js"></script>
<script src="/assets/js/theme/material.min.js"></script>
<script src="/assets/plugins/sweetalert/dist/sweetalert.min.js"></script>

<!-- ================== END BASE JS ================== -->
{{--<script>
    $(document).ready(function() {
        $.ajax({
            url: "{{ route('ver.foto') }}",
            statusCode: {
                500: function() {
                    $('.profile_img').attr('src', '/assets/img/user/user.png')
                }
            },
            success: function() {
                $('.profile_img').attr('src', "{{ route('ver.foto') }}")
            }
        });
    });
</script>--}}
@stack('scripts')
