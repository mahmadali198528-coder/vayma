$pgBin = 'C:\Program Files\PostgreSQL\18\bin'
$pgData = 'C:\Program Files\PostgreSQL\18\data'

# ensure local trust auth for reset
$hba = Join-Path $pgData 'pg_hba.conf'
$original = @(
    '# "local" is for Unix domain socket connections only',
    'local   all             all                                     scram-sha-256',
    '# IPv4 local connections:',
    'host    all             all             127.0.0.1/32            scram-sha-256',
    '# IPv6 local connections:',
    'host    all             all             ::1/128                 scram-sha-256',
    '# Allow replication connections from localhost, by a user with the',
    '# replication privilege.',
    'local   replication     all                                     scram-sha-256'
)
$trusted = @(
    '# "local" is for Unix domain socket connections only',
    'local   all             all                                     trust',
    '# IPv4 local connections:',
    'host    all             all             127.0.0.1/32            trust',
    '# IPv6 local connections:',
    'host    all             all             ::1/128                 trust',
    '# Allow replication connections from localhost, by a user with the',
    '# replication privilege.',
    'local   replication     all                                     trust'
)

if (Test-Path $hba) {
    $content = Get-Content $hba
    if ($content -join "`n" -notmatch 'trust') {
        Set-Content -Path $hba -Value ($trusted -join [Environment]::NewLine)
    }
}

& (Join-Path $pgBin 'pg_ctl.exe') -D $pgData -l (Join-Path $pgData 'pg.log') reload 2>$null

$cmd = Join-Path $pgBin 'psql.exe'
& $cmd -U postgres -h localhost -d postgres -w -c "ALTER USER postgres WITH PASSWORD 'postgres123';"

Write-Host 'Password reset complete. Use: postgresql://postgres:postgres123@localhost:5432/medrese'
