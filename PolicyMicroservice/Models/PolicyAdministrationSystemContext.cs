using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace PolicyMicroservice.Models
{
    public partial class PolicyAdministrationSystemContext : DbContext
    {
        public PolicyAdministrationSystemContext()
        {
        }

        public PolicyAdministrationSystemContext(DbContextOptions<PolicyAdministrationSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ConsumerPolicy> ConsumerPolicies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=LAPTOP;Initial Catalog=PolicyAdministrationSystem;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ConsumerPolicy>(entity =>
            {
                entity.ToTable("ConsumerPolicy");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AcceptanceStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AcceptedQuotes)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ConsumerId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EffectiveDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentDetails)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PolicyStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
